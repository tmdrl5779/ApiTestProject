package com.ap.adaptor.dto

import com.ap.adaptor.dto.enumData.Rule
import com.ap.adaptor.dto.enumData.VariableType

data class CombinationDataList(
    var dataList: MutableList<CombinationData> = mutableListOf(),
    var newKey: String = "",
    var rule: Rule?= null,
    var variableType: VariableType?= null
)
