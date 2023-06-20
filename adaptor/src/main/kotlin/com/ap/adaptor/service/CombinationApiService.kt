package com.ap.adaptor.service

import com.ap.adaptor.dto.Combination
import com.ap.adaptor.dto.CombinationDataList
import com.ap.adaptor.dto.enumData.Rule
import com.ap.adaptor.utils.logger
import kotlinx.coroutines.*
import org.springframework.stereotype.Service

@Service
class CombinationApiService{

    val log = logger()

    suspend fun combineApis(combination: Combination): MutableMap<String, Any> = coroutineScope {

        val newResponse = mutableMapOf<String, Any>()

        val combinationDataLists = combination.combinationDataLists
        val responseOfUri = combination.ResponseOfUri

        val job = combinationDataLists.map {
            launch {
                when (it.rule) {
                    Rule.CONCAT -> concat(it, responseOfUri, newResponse)
                    Rule.ADD -> add(it, responseOfUri, newResponse)
                }
            }
        }

        job.joinAll()

        newResponse
    }

    /**
     * 같은 타입 필드 합치기
     * string + string
     * list + list
     * object + object
     */
    suspend fun concat(combinationDataList: CombinationDataList, uriMap: MutableMap<String, MutableMap<String, Any>>,
                       newResponse: MutableMap<String, Any>) {
        val newKey = combinationDataList.newKey


        newResponse[newKey] = ""

    }

    /**
     * 한 필드에 다른 필드 삽입
     */
    suspend fun insert(combinationDataList: CombinationDataList, uriMap: MutableMap<String, MutableMap<String, Any>>,
                       newResponse: MutableMap<String, Any>) {
        val newKey = combinationDataList.newKey


        newResponse[newKey] = ""

    }

    /**
     * 단순 필드 추가
     */
    suspend fun add(combinationDataList: CombinationDataList, uriMap: MutableMap<String, MutableMap<String, Any>>,
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

        val pathSplit = path.split(".")

        var tmpResponse = response

        for(key in pathSplit){

            val value = tmpResponse[key]

            if(value is MutableMap<*, *>){
                tmpResponse = value as MutableMap<String, Any>
            }else{
                return value!!
            }
        }

        return tmpResponse

    }

    suspend fun isDuplication(newResponse: MutableMap<String, Any>, key: String): Boolean{
        return newResponse.containsKey(key)
    }

}