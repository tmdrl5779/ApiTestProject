package com.ap.adaptor.dto

data class ResponseDataWithUser(
    var userId: String ?= null,
    var response: ResponseData ?= null
)
