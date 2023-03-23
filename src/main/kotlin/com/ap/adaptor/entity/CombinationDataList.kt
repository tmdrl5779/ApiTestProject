package com.ap.adaptor.entity

data class CombinationDataList(
    var combinationDataList: MutableList<CombinationData> = mutableListOf(),
    var newKey: String ?= null,
    var rule: Rule ?= null,
    var type: Type ?= null
)
