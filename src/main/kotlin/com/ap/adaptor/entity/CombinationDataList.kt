package com.ap.adaptor.entity

data class CombinationDataList(
    var combinationDataList: MutableList<CombinationData> = mutableListOf(),
    var keyName: String ?= null,
    var rule: Rule ?= null
)
