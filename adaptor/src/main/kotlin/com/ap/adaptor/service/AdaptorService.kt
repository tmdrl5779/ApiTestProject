package com.ap.adaptor.service

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.dto.*
import com.ap.adaptor.dto.enumData.PerformType
import com.ap.adaptor.utils.UrlUtils
import com.ap.adaptor.utils.logger
import com.fasterxml.jackson.databind.ObjectMapper
import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutException
import io.netty.handler.timeout.ReadTimeoutHandler
import io.netty.handler.timeout.WriteTimeoutHandler
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.reactor.awaitSingle
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.stereotype.Service
import org.springframework.util.StopWatch
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientRequestException
import org.springframework.web.reactive.function.client.WebClientResponseException
import org.springframework.web.reactive.function.client.awaitBody
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Mono
import reactor.netty.http.client.HttpClient
import java.net.ConnectException
import java.net.HttpCookie
import kotlin.system.measureTimeMillis

@Service
class AdaptorService(
    val webClient: WebClient,
    val objectMapper: ObjectMapper
) {

    val log = logger()

    suspend fun responsesForPerForm(
        requestDataList: RequestDataList,
        session: WebSocketSession,
        userIdx: Int
    ) = coroutineScope {
        val requestList = requestDataList.requestList
        var responsesResult = mutableListOf<ResponseData>()
        var totalTime: Long = 0
        var result = true

        when (requestDataList.performType) {
            PerformType.SEQ -> {
                for (i in 0 until requestList.size) {
                    val responseWithTime = async { responseWithTime(requestList[i]) }
                    val deferredValue = responseWithTime.await()

                    responsesResult.add(deferredValue)
                    totalTime += deferredValue.responseTime
                    if (deferredValue.status != HttpStatus.OK.toString()) {
                        result = false
                    }
                }

                var responseDataList = ResponseDataList(responsesResult, totalTime, result, "USER-$userIdx")
                log.info("Response Data Info : $responseDataList")

                //send to websocket
                session.send(Mono.just(session.textMessage(objectMapper.writeValueAsString(responseDataList))))
                    .subscribe()

            }
            PerformType.CONCUR -> {
                totalTime = measureTimeMillis {
                    val deferredValue = requestList.map { async { responseWithTime(it) } }
                    val totalResponseWithTime = deferredValue.awaitAll()

                    responsesResult = totalResponseWithTime as MutableList<ResponseData>
                }

                responsesResult.forEach { response ->
                    if (response.status != HttpStatus.OK.toString()) {
                        result = false
                        return@forEach
                    }
                }

                var responseDataList = ResponseDataList(responsesResult, totalTime, result, "USER-$userIdx")
                log.info("Response Data Info : $responseDataList")

                //send to websocket
                session.send(Mono.just(session.textMessage(objectMapper.writeValueAsString(responseDataList))))
                    .subscribe()

            }
            else -> {
                throw Exception()
            }
        }
    }

    suspend fun responsesForCallApi(requestData: RequestData): MutableList<ResponseData> = coroutineScope {

        val count = requestData.count
        var responsesResult = mutableListOf<ResponseData>()
        var totalTime: Long = 0

        if (count <= 1) {
            val responseWithTime = responseWithTime(requestData)
            responsesResult.add(responseWithTime)
            totalTime = responseWithTime.responseTime
        } else {
            totalTime = measureTimeMillis {
                val deferredValue = List(count) { async { responseWithTime(requestData) } }
                val totalResponseWithTime = deferredValue.awaitAll()
                responsesResult = totalResponseWithTime as MutableList<ResponseData>
            }
        }

        log.info("Response API result : $responsesResult")
        log.info("Total API Call Time : $totalTime")

        responsesResult
    }


    suspend fun responseWithTime(requestData: RequestData): ResponseData {
        val stopWatch = StopWatch()
        var response: MutableMap<String, Any> = mutableMapOf()
        var status = HttpStatus.OK.toString()
        stopWatch.start()
        try {
            response = callApi(requestData)
            log.info("API Call success : $response")
        } catch (e: WebClientResponseException) {
            status = e.statusCode.toString()
            log.info("API Call Fail : ${e.message.toString()}")
        }catch (e: WebClientRequestException){
            when(e.rootCause){
                is ConnectException -> {
                    status = "597 Connection Time out"
                    log.info("API Call Fail : ${e.rootCause}")
                }
                is ReadTimeoutException -> {
                    status = "598 ReadTime out"
                    log.info("API Call Fail : ${e.rootCause}")
                }
                else -> {
                    val errorSplit = e.message.toString().split(";")
                    status = "599 Request Exception ${errorSplit[0]}"
                }
            }
            log.info("API Call Fail : ${e.message.toString()}")

        }
        stopWatch.stop()

        return ResponseData(
            stopWatch.totalTimeMillis,
            response["responseBody"],
            status,
            response["responseHeader"],
            response["responseCookie"],
            requestData.url,
            requestData.httpMethod
        )
    }


    suspend fun callApi(requestData: RequestData): MutableMap<String, Any> {
        val connectionTime = requestData.time.connectionTime
        val readTime = requestData.time.readTime
        val writeTime = requestData.time.writeTime

        val baseurlAndUri = UrlUtils.splitUrl(requestData.url)
        val baseUrl = baseurlAndUri.first
        val uri = UrlUtils.splitParam(baseurlAndUri.second)
        var method = requestData.httpMethod

        val param = UrlUtils.makeParam(requestData.param)
        val header = requestData.header
        val body = requestData.body

        val httpClient = HttpClient.create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectionTime * 1000)
            .doOnConnected { conn ->
                conn
                    .addHandlerLast(ReadTimeoutHandler(readTime))
                    .addHandlerLast(WriteTimeoutHandler(writeTime))
            }

        log.info("Request Data Info : ${requestData.toString()}")

        val responseSpec = webClient.mutate().clientConnector(ReactorClientHttpConnector(httpClient))
            .baseUrl(baseUrl).build()
            .run {
                when (method) {
                    Constants.HTTP_METHOD_GET -> {
                        get()
                            .uri("$uri?$param")
                            .accept(MediaType.APPLICATION_JSON)
                    }
                    Constants.HTTP_METHOD_POST -> {
                        post()
                            .uri("$uri?$param")
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(body)

                    }
                    Constants.HTTP_METHOD_PUT -> {
                        put()
                            .uri("$uri?$param")
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(body)
                    }
                    Constants.HTTP_METHOD_DELETE -> {
                        delete()
                            .uri("$uri?$param")
                            .accept(MediaType.APPLICATION_JSON)
                    }
                    else -> {
                        patch()
                            .uri("$uri?$param")
                            .accept(MediaType.APPLICATION_JSON)
                            .contentType(MediaType.APPLICATION_JSON)
                            .bodyValue(body)
                    }
                }
            }
            .headers { headers ->
                run {
                    header.forEach { (key, value) ->
                        headers.add(key, value)
                    }
                }
            }
            .retrieve()
//            .awaitBody<Any>()

        val responseBody = responseSpec.awaitBody<Any>()
        val responseHeader = responseSpec.toEntity(String::class.java).awaitSingle().headers
        val setCookieHeaders = responseHeader[HttpHeaders.SET_COOKIE]
        val responseCookie: List<HttpCookie> = setCookieHeaders?.flatMap { HttpCookie.parse(it) } ?: emptyList()

        return mutableMapOf(
            "responseBody" to responseBody,
            "responseHeader" to responseHeader,
            "responseCookie" to responseCookie
        )
    }
}