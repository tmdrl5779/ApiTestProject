package com.ap.adaptor

import kotlinx.coroutines.CoroutineScope
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AdaptorApplication

fun main(args: Array<String>) {
    runApplication<AdaptorApplication>(*args)
}
