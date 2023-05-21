package com.ap.adaptor.entity

import com.ap.adaptor.entity.enumData.Rule
import com.ap.adaptor.entity.enumData.VariableType

data class CombinationDataList(
    var dataList: MutableList<CombinationData> = mutableListOf(),
    var newKey: String = "",
    var rule: Rule?= null,
    var variableType: VariableType?= null
)
