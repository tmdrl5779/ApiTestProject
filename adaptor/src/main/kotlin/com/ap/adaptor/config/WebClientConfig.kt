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
        val connectionProvider =
            ConnectionProvider.builder("myConnectionPool").maxConnections(10000).pendingAcquireMaxCount(10000).build()

        val httpClient = HttpClient
            .create(connectionProvider)
            .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 100000)
            .doOnConnected { conn ->
                conn
                    .addHandlerLast(ReadTimeoutHandler(300))
                    .addHandlerLast(WriteTimeoutHandler(300))
            }


        return WebClient.builder()
            .clientConnector(ReactorClientHttpConnector(httpClient))
            .build()
    }
}