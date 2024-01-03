package com.ap.adaptor.dto

data class ResponseDataList(
    var responseList: MutableList<ResponseData> = mutableListOf(),
    var totalTime: Long = 0,
    var result: Boolean = false,
    var userId: String ?= null,
)
