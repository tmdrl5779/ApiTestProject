package com.ap.adaptor.dto

data class RequestData(
//    var sort: Long = 0,
    var time: Time = Time(30, 30, 30),
    var count: Int = 1,
    var url: String = "",
    var httpMethod: String = "",
    var param: MutableMap<String, String> = mutableMapOf(),
    var header: MutableMap<String, String> = mutableMapOf(),
    var body: MutableMap<String, Any> = mutableMapOf()
)
