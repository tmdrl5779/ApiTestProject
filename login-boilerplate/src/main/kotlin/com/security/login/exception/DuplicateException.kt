package com.security.login.exception

import java.lang.RuntimeException
class DuplicateException : RuntimeException {

    constructor(message: String) : super(message)

}