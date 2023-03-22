package com.ap.adaptor.service

import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.springframework.util.StopWatch
import kotlin.random.Random
import kotlin.system.measureTimeMillis

internal class CoroutineTest {

    @Test
    suspend fun callApi()  = runBlocking<Unit>{

        val time = measureTimeMillis{

            val deferredValue = List(10) { async { callBigApiWithTIme() }}
            val results = deferredValue.awaitAll()
            println("API Call result : $results")
        }

        println("수행시간 : $time")

    }

    suspend fun callBigApiWithTIme(): Pair<Any, Long>{
        val start = System.currentTimeMillis()
        val result = bigApi()
        val end = System.currentTimeMillis()
        return Pair(result, end - start)
    }

    suspend fun bigApi(): Int{
        delay(1000L)
        return Random.nextInt(0, 500)
    }


}