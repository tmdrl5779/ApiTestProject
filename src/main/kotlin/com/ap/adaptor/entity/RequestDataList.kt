package com.ap.adaptor.entity

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.entity.enumData.ScenarioType

data class RequestDataList(
    var requestList: MutableList<RequestData> = mutableListOf(),
    var scenarioType: ScenarioType ?= null
)
