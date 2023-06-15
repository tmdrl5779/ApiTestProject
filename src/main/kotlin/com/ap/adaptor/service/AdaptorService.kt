package com.ap.adaptor.service

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.dto.RequestData
import com.ap.adaptor.dto.ResponseData
import com.ap.adaptor.utils.UrlUtils
import com.ap.adaptor.utils.logger
import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutHandler
import io.netty.handler.timeout.WriteTimeoutHandler
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.stereotype.Service
import org.springframework.util.StopWatch
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException
import org.springframework.web.reactive.function.client.awaitBody
import reactor.netty.http.client.HttpClient
import kotlin.system.measureTimeMillis

@Service
class AdaptorService(
    val webClient: WebClient,
) {

    val log = logger()

    suspend fun responses(requestData: RequestData):MutableList<ResponseData> = coroutineScope{

        val count = requestData.count
        var responsesResult = mutableListOf<ResponseData>()
        var totalTime: Long = 0

        if(count == 1){
            val responseWithTime = responseWithTime(requestData)
            responsesResult.add(responseWithTime)
            totalTime = responseWithTime.responseTime
        }else{
            totalTime = measureTimeMillis {
                val deferredValue = List(count) { async { responseWithTime(requestData) }}
                val totalResponseWithTime = deferredValue.awaitAll()
                responsesResult = totalResponseWithTime as MutableList<ResponseData>
            }
        }

        log.info("Response API result : $responsesResult")
        log.info("Total API Call Time : $totalTime")

        responsesResult
    }


    suspend fun responseWithTime(requestData: RequestData): ResponseData{
        val stopWatch = StopWatch()
        var response: Any ?= null
        var status = HttpStatus.OK.toString()
        stopWatch.start()
        try{
            response = callApi(requestData)
            log.info("API Call success : $response")
        }catch (e: WebClientResponseException){
            status = e.statusCode.toString()
            log.info("API Call Fail")
        }
        stopWatch.stop()

        return ResponseData(stopWatch.totalTimeMillis, response, status)
    }


    suspend fun callApi(requestData: RequestData): Any{
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
            .doOnConnected { conn -> conn
                .addHandlerLast(ReadTimeoutHandler(readTime))
                .addHandlerLast(WriteTimeoutHandler(writeTime))
            }

        log.info("Request Data Info : ${requestData.toString()}")

        return webClient.mutate().clientConnector(ReactorClientHttpConnector(httpClient))
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
            .awaitBody<Any>()

    }
}