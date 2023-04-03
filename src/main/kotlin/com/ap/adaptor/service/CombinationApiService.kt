package com.ap.adaptor.service

import com.ap.adaptor.entity.Combination
import com.ap.adaptor.entity.CombinationDataList
import com.ap.adaptor.entity.Rule
import com.ap.adaptor.utils.logger
import kotlinx.coroutines.*
import org.springframework.stereotype.Service

@Service
class CombinationApiService{

    val log = logger()

    suspend fun combineApis(combination: Combination): MutableMap<String, Any> = coroutineScope {

        val newResponse = mutableMapOf<String, Any>()

        val combinationDataLists = combination.combinationDataLists
        val uriMap = combination.uri

        val job = combinationDataLists.map {
            launch {
                when (it.rule) {
                    Rule.CONCAT -> concat(it, uriMap, newResponse)
                    Rule.INSERT -> insert(it, uriMap, newResponse)
                }
            }
        }

        job.joinAll()

        //return
        newResponse

    }

    suspend fun concat(combinationDataList: CombinationDataList, uriMap: MutableMap<String, MutableMap<String, Any>>,
                       newResponse: MutableMap<String, Any>) {
        val newKey = combinationDataList.newKey


        newResponse[newKey] = ""

    }

    suspend fun insert(combinationDataList: CombinationDataList, uriMap: MutableMap<String, MutableMap<String, Any>>,
                       newResponse: MutableMap<String, Any>) {

        val combinationData = combinationDataList.dataList[0]
        val uri = combinationData.responseUri
        val path = combinationData.path

        var key = path.split(".").last()
        var idx = 0

        while(isDuplication(newResponse, key)){
            idx++
            key += idx
        }

        val response = uriMap[uri]!!
        val findValue = findValue(response, path)

        newResponse[key] = findValue

    }

    private fun findValue(response: MutableMap<String, Any>, path: String): Any {
        TODO("Not yet implemented")
    }

    suspend fun isDuplication(newResponse: MutableMap<String, Any>, key: String): Boolean{
        return newResponse.containsKey(key)
    }

}