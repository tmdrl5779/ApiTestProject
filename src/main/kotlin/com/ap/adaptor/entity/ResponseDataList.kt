package com.ap.adaptor.entity

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.entity.enumData.ScenarioType

data class ResponseDataList(
    var responseList: MutableList<ResponseData> = mutableListOf(),
    var totalTime: Long = 0,
    var result: Boolean = false
)
