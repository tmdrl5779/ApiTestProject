package com.ap.adaptor.coroutine

import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

import org.springframework.util.StopWatch

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

    @Test
    suspend fun busyApi(){
        delay(1000)
    }

}