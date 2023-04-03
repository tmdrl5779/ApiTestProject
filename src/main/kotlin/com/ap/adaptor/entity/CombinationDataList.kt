package com.ap.adaptor.entity

data class CombinationDataList(
    var dataList: MutableList<CombinationData> = mutableListOf(),
    var newKey: String = "",
    var rule: Rule ?= null,
    var type: Type ?= null
)
