package com.ap.adaptor.service

import com.ap.adaptor.entity.RequestDataList
import com.ap.adaptor.entity.ResponseDataList
import com.ap.adaptor.entity.enumData.ScenarioType
import org.springframework.stereotype.Service

@Service
class PerformService(
    val adaptorService: AdaptorService
) {

    fun measurePerform(requestDataList: RequestDataList): ResponseDataList {
        return when(requestDataList.scenarioType){
            ScenarioType.SEQ -> runSequential()
            ScenarioType.CONCUR -> runConcurrently()
            else -> throw Exception()
        }
    }


    fun runSequential(): ResponseDataList{
        return ResponseDataList()
    }


    fun runConcurrently(): ResponseDataList{
        return ResponseDataList()
    }
}