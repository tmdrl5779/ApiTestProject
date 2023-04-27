package com.ap.adaptor.entity

data class ResponseData(
    var responseTime: Long = 0,
//    var body: MutableMap<String, Any> = mutableMapOf(),
    var body: Any ?= null,
    var status: String = ""
)
