package com.ap.adaptor.dto

import com.ap.adaptor.dto.enumData.PerformType

data class RequestDataList(
    var requestList: MutableList<RequestData> = mutableListOf(),
    var performType: PerformType ?= null
)
