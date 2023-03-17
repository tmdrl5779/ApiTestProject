package com.ap.adaptor.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springdoc.core.GroupedOpenApi
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class Swagger2Config {

    @Bean
    fun publicApi(): GroupedOpenApi {
        return GroupedOpenApi.builder()
            .group("v1-definition")
            .pathsToMatch("/api/**")
            .build()
    }

    @Bean
    fun springOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("API")
                    .description("API TEST api 명세서 입니다.")
                    .version("v0.0.1")
            )
    }
}