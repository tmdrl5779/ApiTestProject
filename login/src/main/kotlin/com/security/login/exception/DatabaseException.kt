package com.security.login.exception

import java.lang.RuntimeException
class DatabaseException : RuntimeException {

    constructor(message: String) : super(message)

}