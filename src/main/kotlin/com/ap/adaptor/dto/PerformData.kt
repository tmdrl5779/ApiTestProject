package com.ap.adaptor.dto

import com.ap.adaptor.dto.enumData.PerformType

data class PerformData (
    var requestData: RequestData = RequestData(),
    var performType: PerformType = PerformType.SEQ,
    var userCount: Int = 1,
    var interval: Long = 0,
    var repeatCount: Int = 1
)