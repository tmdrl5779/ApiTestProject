package com.ap.adaptor.service

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.entity.RequestData
import com.ap.adaptor.entity.ResponseData
import com.ap.adaptor.utils.Utils
import com.ap.adaptor.utils.logger
import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutHandler
import io.netty.handler.timeout.WriteTimeoutHandler
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import org.springframework.http.MediaType
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.stereotype.Service
import org.springframework.util.StopWatch
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.awaitBody
import reactor.netty.http.client.HttpClient
import kotlin.system.measureTimeMillis

@Service
class AdaptorService(
    val webClient: WebClient,
) {

    val log = logger()

    suspend fun callApi(requestData: RequestData, method: String) = coroutineScope{

        val count = requestData.count
        var responses = mutableListOf<ResponseData>()

        if(count == 1){
            val responseApiWithTime = responseApiWithTime(requestData, method)
            responses.add(responseApiWithTime)
        }else{
            val totalTime = measureTimeMillis {
                val defferedValue = List(count) { async { responseApiWithTime(requestData, method) }}
                val totalResponseApiWithTime = defferedValue.awaitAll()
                responses = totalResponseApiWithTime as MutableList<ResponseData>
            }
        }

    }

    suspend fun responseApiWithTime(requestData: RequestData, method: String): ResponseData{
        val stopWatch = StopWatch()
        stopWatch.start()
        val response = responseApi(requestData, method)
        stopWatch.stop()

        return ResponseData(stopWatch.totalTimeMillis, response)
    }


    suspend fun responseApi(requestData: RequestData, method: String): MutableMap<String, Any> {
        val connectionTime = requestData.time.connectionTime
        val readTime = requestData.time.readTime
        val writeTime = requestData.time.writeTime

        val baseurlAndUri = Utils.splitUrl(requestData.url)
        val baseUrl = baseurlAndUri.first
        val uri = baseurlAndUri.second

        val param = Utils.makeParam(requestData.param)
        val auth = requestData.auth
        val header = requestData.header
        val body = requestData.body

        val httpClient = HttpClient.create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, connectionTime * 1000)
            .doOnConnected { conn -> conn
                .addHandlerLast(ReadTimeoutHandler(readTime))
                .addHandlerLast(WriteTimeoutHandler(writeTime))
            }

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
            .awaitBody<MutableMap<String, Any>>()

    }
}