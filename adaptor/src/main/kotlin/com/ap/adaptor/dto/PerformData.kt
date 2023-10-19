package com.ap.adaptor.dto

import com.ap.adaptor.dto.enumData.PerformType
import com.fasterxml.jackson.annotation.JsonIgnoreProperties

@JsonIgnoreProperties(ignoreUnknown = true)
data class PerformData (
    var requestDataList: RequestDataList = RequestDataList(),
//    var performType: PerformType = PerformType.SEQ,
    var userCount: Int = 1,
    var interval: Long = 0,
    var repeatCount: Int = 1
)