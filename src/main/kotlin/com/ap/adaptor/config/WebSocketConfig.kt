package com.ap.adaptor.config

import com.ap.adaptor.handler.WebSocketHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.Ordered
import org.springframework.web.reactive.HandlerMapping
import org.springframework.web.reactive.handler.SimpleUrlHandlerMapping

@Configuration
class WebSocketConfig {

    @Bean
    fun handler(webSocketHandler: WebSocketHandler): HandlerMapping {
        val handlerMapping = SimpleUrlHandlerMapping()
        handlerMapping.urlMap = mapOf("/api/perform/socket-connect" to webSocketHandler)
        handlerMapping.order = Ordered.HIGHEST_PRECEDENCE
        return handlerMapping
    }
}