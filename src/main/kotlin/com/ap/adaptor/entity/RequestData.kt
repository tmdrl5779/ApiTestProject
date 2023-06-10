package com.ap.adaptor.entity

import com.ap.adaptor.constants.Constants

data class RequestData(
    var time: Time = Time(30, 30, 30),
    var count: Int = 1,
    var url: String = "",
    var httpMethod: String = "",
//    var auth: MutableMap<String, Any> = mutableMapOf(),
    var param: MutableMap<String, String> = mutableMapOf(),
    var header: MutableMap<String, String> = mutableMapOf(),
    var body: MutableMap<String, Any> = mutableMapOf()
)
