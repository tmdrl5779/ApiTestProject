package com.ap.adaptor.entity

data class CombinationData(
    var id: Int ?= null,
    var requestData: RequestData = RequestData(),
    var values: MutableList<String> = mutableListOf()
)
