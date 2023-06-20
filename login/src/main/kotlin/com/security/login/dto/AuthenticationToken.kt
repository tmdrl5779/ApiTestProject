package com.security.login.dto

data class AuthenticationToken(
    val accessToken : String,
    val refreshToken : String
)
