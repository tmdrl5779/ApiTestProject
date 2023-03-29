package com.ap.adaptor.service

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.entity.CombinationDataList
import com.ap.adaptor.entity.CombinationDataLists
import com.ap.adaptor.entity.RequestData
import com.ap.adaptor.entity.ResponseData
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
class CombinationApiService(
    val webClient: WebClient,
) {

    val log = logger()

    suspend fun combineApis(combinationDataLists: CombinationDataLists) = coroutineScope {

        val newResponse = mutableMapOf<String, Any>()





    }

    suspend fun concat(){

    }

}