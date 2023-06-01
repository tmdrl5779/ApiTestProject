package com.ap.adaptor.service

import com.ap.adaptor.entity.RequestDataList
import com.ap.adaptor.entity.ResponseDataList
import com.ap.adaptor.entity.enumData.ScenarioType
import com.ap.adaptor.utils.logger
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.delay
import org.springframework.stereotype.Service
import kotlin.system.measureTimeMillis

@Service
class PerformService(
    val adaptorService: AdaptorService
) {
    val log = logger()

    suspend fun measurePerform(requestDataList: RequestDataList): ResponseDataList {
        return when(requestDataList.scenarioType){
            ScenarioType.SEQ -> runSequential()
            ScenarioType.CONCUR -> runConcurrently()
            else -> throw Exception()
        }
    }

    suspend fun runSequential(): ResponseDataList{
        return ResponseDataList()
    }


    suspend fun runConcurrently(): ResponseDataList{
        return ResponseDataList()
    }


    suspend fun measureTestPerform(): MutableMap<String, Any> = coroutineScope{

        val map = mutableMapOf<String, Any>()

        val time = measureTimeMillis {
            val deferredValue = async { busyApi() }
            log.info(">>>>>>>>>> call api busy Test <<<<<<<<<<<")

            val await = deferredValue.await()

            map.putAll(await)

        }

        map["Time"] = time

        map
    }

    suspend fun busyApi():MutableMap<String, Any>{
        delay(30000)

        val map = mutableMapOf<String, Any>()
        map["A"] = "a"
        map["B"] = "b"
        map["C"] = "c"

        return map
    }



}