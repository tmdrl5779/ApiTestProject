package com.security.login.constants

object Constants {
    const val DUPLICATE_USERNAME = "중복된 사용자 이름입니다."
    const val CAN_NOT_FIND_DATA = "사용자를 찾을 수 없습니다."
    const val ACCESS_TOKEN = "access"
    const val REFRESH_TOKEN = "refresh"

    const val NOT_FIND_AUTHORITY = "권한 정보가 없는 토큰입니다."
    const val AUTHORITY_NAME_IN_JWT = "auth"
    const val REDIS_REFRESH_KEY = "RefreshToken"

    const val REFRESH_TOKEN_MIN = 3.toLong()
    const val ACCESS_TOKEN_MIN = 1.toLong()
    const val COOKIE_MIN = 1440.toLong()
}