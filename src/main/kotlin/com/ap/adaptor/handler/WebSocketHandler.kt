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

//
//    override fun afterConnectionEstablished(session: WebSocketSession) {
//        // WebSocket 연결이 수립되었을 때 실행되는 메서드
//    }
//
//    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
//        // WebSocket 연결이 종료될 때 실행되는 메서드
//    }
//
//    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) = runBlocking{
//        val payload = message.payload
//
//        // payload 파싱하여 사용자 수, 반복 간격, 반복 횟수 등을 추출합니다.
//        val userCount = parseUserCount(payload)
//        val interval = parseInterval(payload)
//        val repeatCount = parseRepeatCount(payload)
//
//
//        val coroutineScope = CoroutineScope(Dispatchers.IO)
//
//        val job = coroutineScope.launch {
//
//
//            delay(interval)
//        }
//
//        job.join()
//        session.close()
//    }

//    override fun handle(webSocketSession: WebSocketSession): Mono<Void> {
//        val stringFlux = webSocketSession.receive()
//            .map { obj: WebSocketMessage -> obj.payloadAsText }
//            .map { obj: String -> obj.toUpperCase() }
//            .map { payload: String? ->
//                webSocketSession.textMessage(
//                    payload!!
//                )
//            }
//        return webSocketSession.send(stringFlux)
//    }

    override fun handle(session: WebSocketSession): Mono<Void> {

        val inbound = session.receive()
            .map { message -> message.payloadAsText }
            .flatMap { payload ->
//                val userCount = parseUserCount(payload)
//                val interval = parseInterval(payload)
                val interval = 1L
//                val repeatCount = parseRepeatCount(payload)
                val repeatCount = 10

                val coroutineScope = CoroutineScope(Dispatchers.IO)
                coroutineScope.launch {
                    repeat(repeatCount) {
                        session.send(Mono.just(session.textMessage("aaaaaaaaaaaaaaa"))).subscribe()
                        delay(interval)
                    }
                    session.send(Mono.just(session.textMessage("connection close"))).then(session.close()).subscribe()

                }
                Mono.empty<Void>()

            }
            .then()

        return inbound

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