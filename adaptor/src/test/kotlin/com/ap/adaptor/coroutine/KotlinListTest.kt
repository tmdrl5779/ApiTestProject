package com.ap.adaptor.coroutine

import kotlinx.coroutines.*
import org.junit.jupiter.api.Test
import kotlin.system.measureTimeMillis

class KotlinListTest {


    @Test
    fun listTest() = runBlocking{

//        val time = measureTimeMillis{
//            val jobs = List(10) { launch { callApi() } }
//            jobs.joinAll()
//        }
//
//        println()
//        println("time1 : ${time}")

//        val time2 = measureTimeMillis{
//
//            for(i in 1..10){
//                val job = launch { callApi() }
//                job.join()
//            }
//        }
//
//        println()
//        println("time2 : ${time2}")

        val time3 = measureTimeMillis{
            val list = List(10) { async { callApi2() } }
            val awaitAll = list.awaitAll()
            println(awaitAll.toString())
        }

        println()
        println("time1 : ${time3}")

    }

    suspend fun callApi(): Long {
        var i = (10..1000).random().toLong()
        println(i)
        delay(i)
        return i
    }

    suspend fun callApi2(): Map<String, Long> {
        val response = mutableMapOf<String, Long>()
        var i = (10..1000).random().toLong()
        delay(i)
        response["time"] = i
        return response
    }
}