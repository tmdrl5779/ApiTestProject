package com.ap.adaptor.handler

import com.ap.adaptor.service.AdaptorService
import kotlinx.coroutines.*
import org.springframework.stereotype.Component
import org.springframework.web.reactive.socket.WebSocketHandler
import org.springframework.web.reactive.socket.WebSocketSession
import reactor.core.publisher.Mono




@Component
class WebSocketHandler(
    val adaptorService: AdaptorService
) : WebSocketHandler {

    override fun handle(session: WebSocketSession): Mono<Void> {

        val receiveAndCallApi = session.receive()
            .flatMap { message ->
                val requestData = message.payloadAsText

//                val userCount = parseUserCount(payload)
//                val interval = parseInterval(payload)
                val interval = 1L
//                val repeatCount = parseRepeatCount(payload)
                val repeatCount = 10

                val coroutineScope = CoroutineScope(Dispatchers.IO)
                coroutineScope.launch {
                    repeat(repeatCount) {

                        val response = callApi(requestData)

                        session.send(Mono.just(session.textMessage(response))).subscribe()
                        delay(interval)
                    }
                    session.send(Mono.just(session.textMessage("connection close success"))).then(session.close()).subscribe()

                }
                Mono.empty<Void>()

            }
            .doOnError { error ->
                session.send(Mono.just(session.textMessage("connection close : $error"))).then(session.close()).subscribe()
            }
            .then()


        return session.send(Mono.just(session.textMessage("Connection open success")))
            .thenMany(receiveAndCallApi)
            .then()


//        return receiveAndCallApi

    }


    private suspend fun callApi(requestData: String): String {
        return requestData
    }



    private fun parseRepeatCount(payload: String): Int {
        TODO("Not yet implemented")
    }

    private fun parseInterval(payload: String): Long {
        TODO("Not yet implemented")
    }

    private fun parseUserCount(payload: String): Int {
        TODO("Not yet implemented")
    }



}