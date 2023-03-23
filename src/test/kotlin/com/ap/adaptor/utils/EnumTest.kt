package com.ap.adaptor.utils

import org.junit.jupiter.api.Test

class EnumTest {

    @Test
    fun enumTest(){

        println(Rule.CONCAT.toString() == "CONCAT")

        println(Type.ARRAY.value == "Array")

    }

    enum class Rule {
        CONCAT
    }

    enum class Type(val value: String) {
        STRING("String"),
        INT("Int"),
        ARRAY("Array"),
        OBJECT("Object")
    }
}