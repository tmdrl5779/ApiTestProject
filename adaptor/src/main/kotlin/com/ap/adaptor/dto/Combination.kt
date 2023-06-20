package com.ap.adaptor.dto

data class Combination(
    var ResponseOfUri: MutableMap<String, MutableMap<String, Any>> = mutableMapOf(),
    var combinationDataLists: MutableList<CombinationDataList> = mutableListOf()

//    test1.test2.test3
//    {
//        "key1" : {
//            "key2" : {
//                "key3" : "value"
//            }
//        }
//    }
)
