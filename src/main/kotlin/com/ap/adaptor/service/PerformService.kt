package com.ap.adaptor.service

import com.ap.adaptor.entity.RequestDataList
import com.ap.adaptor.entity.ResponseDataList
import com.ap.adaptor.entity.enumData.ScenarioType
import com.ap.adaptor.utils.logger
import kotlinx.coroutines.*
import org.springframework.stereotype.Service
import org.springframework.util.StopWatch
import java.lang.Thread.sleep
import kotlin.system.measureTimeMillis

@Service
class PerformService(
    val adaptorService: AdaptorService
) {
    val log = logger()

    suspend fun measurePerform(requestDataList: RequestDataList): ResponseDataList {
        return when (requestDataList.scenarioType) {
            ScenarioType.SEQ -> runSequential()
            ScenarioType.CONCUR -> runConcurrently()
            else -> throw Exception()
        }
    }

    suspend fun runSequential(): ResponseDataList {
        return ResponseDataList()
    }


    suspend fun runConcurrently(): ResponseDataList {
        return ResponseDataList()
    }


    suspend fun measureTestPerform(): MutableMap<String, Any> = withContext(Dispatchers.IO) {
        val map = mutableMapOf<String, Any>()

        val time = measureTimeMillis {
            val deferredValue = async { busyApi() }

            val await = deferredValue.await()

            map.putAll(await)
        }

        map["Time"] = time

        map
    }

    suspend fun busyApi(): MutableMap<String, Any> {
        delay(30000)

        val map = mutableMapOf<String, Any>()
        map["A"] = "a"
        map["B"] = "b"
        map["C"] = "c"

        log.info(">>>>>>>>>> finish call api busy Test <<<<<<<<<<<")
        return map
    }

    fun measureTestPerform2(): MutableMap<String, Any> {

        val map = mutableMapOf<String, Any>()

        val stopWatch = StopWatch()

        stopWatch.start()
        val value = busyApi2()
        log.info(">>>>>>>>>> finish call api busy Test <<<<<<<<<<<")
        stopWatch.stop()

        map.putAll(value)

        map["Time"] = stopWatch.totalTimeMillis

        return map
    }

    fun busyApi2(): MutableMap<String, Any> {
        sleep(30000)

        val map = mutableMapOf<String, Any>()
        map["A"] = "a"
        map["B"] = "b"
        map["C"] = "c"

        return map
    }

    suspend fun measureTestPerform3(): MutableMap<String, Any> = coroutineScope {
        val map = mutableMapOf<String, Any>()

        val time = measureTimeMillis {
            val deferredValue = async { busyApi() }

            val await = deferredValue.await()

            map.putAll(await)
        }

        map["Time"] = time

        map
    }

}