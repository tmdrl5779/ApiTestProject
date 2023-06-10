package com.ap.adaptor.handler

import com.ap.adaptor.service.AdaptorService
import kotlinx.coroutines.*
import org.springframework.stereotype.Component
import org.springframework.web.socket.CloseStatus
import org.springframework.web.socket.TextMessage
import org.springframework.web.socket.WebSocketSession
import org.springframework.web.socket.handler.TextWebSocketHandler

@Component
class WebSocketHandler(
    val adaptorService: AdaptorService
) : TextWebSocketHandler() {


    override fun afterConnectionEstablished(session: WebSocketSession) {
        // WebSocket 연결이 수립되었을 때 실행되는 메서드
    }

    override fun afterConnectionClosed(session: WebSocketSession, status: CloseStatus) {
        // WebSocket 연결이 종료될 때 실행되는 메서드
    }

    override fun handleTextMessage(session: WebSocketSession, message: TextMessage) = runBlocking{
        val payload = message.payload

        // payload 파싱하여 사용자 수, 반복 간격, 반복 횟수 등을 추출합니다.
        val userCount = parseUserCount(payload)
        val interval = parseInterval(payload)
        val repeatCount = parseRepeatCount(payload)


        val coroutineScope = CoroutineScope(Dispatchers.IO)

        val job = coroutineScope.launch {


            delay(interval)
        }

        job.join()
        session.close()
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