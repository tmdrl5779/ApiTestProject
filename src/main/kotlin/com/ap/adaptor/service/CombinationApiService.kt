package com.ap.adaptor.service

import com.ap.adaptor.entity.CombinationDataList
import com.ap.adaptor.entity.Rule
import com.ap.adaptor.utils.logger
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class CombinationApiService(
    val webClient: WebClient,
) {

    val log = logger()

    suspend fun combineApis(combinationDataLists: MutableList<CombinationDataList>): MutableMap<String, Any> = coroutineScope {

        val newResponse = mutableMapOf<String, Any>()

        val deferredValue = combinationDataLists.map { async {
            when(it.rule){
                Rule.CONCAT -> concat(it, newResponse)
                Rule.INSERT -> insert(it, newResponse)
            }
        } }

        deferredValue.awaitAll()

        //return
        newResponse

    }

    suspend fun concat(combinationDataList: CombinationDataList, newResponse: MutableMap<String, Any>) {

    }

    suspend fun insert(combinationDataList: CombinationDataList, newResponse: MutableMap<String, Any>) {

    }

    suspend fun checkDuplication(newResponse: MutableMap<String, Any>, path: String){

    }

}