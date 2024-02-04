package com.ap.adaptor.customException

import java.lang.Exception

class CustomWebSocketException(message: String) : RuntimeException(message)