package com.ap.adaptor.config

import io.netty.channel.ChannelOption
import io.netty.handler.timeout.ReadTimeoutHandler
import io.netty.handler.timeout.WriteTimeoutHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.http.client.HttpClient
import reactor.netty.resources.ConnectionProvider


@Configuration
class WebClientConfig {

    @Bean
    fun webClient(): WebClient {

        val httpClient = HttpClient
            .create()
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 0)
            .doOnConnected { conn ->
                conn
                    .addHandlerLast(ReadTimeoutHandler(0))
                    .addHandlerLast(WriteTimeoutHandler(0))
            }


        return WebClient.builder()
            .clientConnector(ReactorClientHttpConnector(httpClient))
            .build()
    }
}