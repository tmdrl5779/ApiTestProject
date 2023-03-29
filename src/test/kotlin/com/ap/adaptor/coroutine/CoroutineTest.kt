package com.ap.adaptor.coroutine

import kotlinx.coroutines.*
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.springframework.util.StopWatch
import kotlin.random.Random
import kotlin.system.measureTimeMillis

@SpringBootTest
class CoroutineTest {

    @Test
    fun coroutineTest() = runBlocking {

        val list = mutableListOf<Long>()

        val stopWatch2 = StopWatch()
        stopWatch2.start()
        repeat(10){
            val stopWatch = StopWatch()
            stopWatch.start()
            busyApi()
            stopWatch.stop()
            list.add(stopWatch.totalTimeMillis)
        }
        stopWatch2.stop()
        print(stopWatch2.totalTimeMillis)

    }

    suspend fun busyApi(){
        delay(1000)
    }

    @Test
    fun launchTest() = runBlocking<Unit> {
        val map = mutableMapOf<String, Any>()
        val list = mutableListOf<String>()

        list.add("key1")
        list.add("key2")
        list.add("key3")
        list.add("key4")

        val measureTimeMillis = measureTimeMillis {
            val deferredValue = list.map { async { addMap(it, map) } }
            deferredValue.awaitAll()
        }


        print(map.toString() + measureTimeMillis)

    }

    suspend fun addMap(key: String, map: MutableMap<String, Any>){
        delay(1000L)
        map[key] = key
    }

    @Test
    fun callApi()  = runBlocking<Unit>{

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