package com.ap.adaptor.entity

data class RequestData(
    var time: Time = Time(30, 30, 30),
    var readTime: Int = 30,
    var writeTime: Int = 30,
    var count: Int = 0,
    var url: String = "",
    var auth: MutableMap<String, Any> = mutableMapOf(),
    var param: MutableMap<String, String> = mutableMapOf(),
    var header: MutableMap<String, String> = mutableMapOf(),
    var body: MutableMap<String, Any> = mutableMapOf()
)
