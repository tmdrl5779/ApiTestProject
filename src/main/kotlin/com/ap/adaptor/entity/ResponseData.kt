package com.ap.adaptor.entity

data class ResponseData(
    var responseTime: Long = 0,
//    var status: String = "",
    var body: MutableMap<String, Any> = mutableMapOf()
)
