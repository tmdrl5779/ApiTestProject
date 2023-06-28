package com.ap.adaptor.utils

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Test

class StringTest {

    @Test
    fun jsonToStringTest(){

        var json = "{\n" +
                "  \"Name\" : \"투케이\",\n" +
                "  \"Age\" : 30,\n" +
                "  \"BookList\" : [\n" +
                "    {\"idx\" : 1, \"Name\" : \"JAVA\"},\n" +
                "    {\"idx\" : 2, \"Name\" : \"Android\"},\n" +
                "    {\"idx\" : 3, \"Name\" : \"Kotlin\"}\n" +
                "  ],\n" +
                "  \"Hobby\" : {\"Name\" : \"Coding\"},\n" +
                "  \"Address\" : {\"Addr\" : [{\"Name\":\"yeoungju\"}, {\"Name\":\"seoul\"}]}\n" +
                "}";

        val objectMapper = jacksonObjectMapper()
        val map = objectMapper.readValue(json, MutableMap::class.java)

        println(map)

        print(map["test"])

    }

    @Test
    fun stringBlankTest(){
        println(" ".isNullOrBlank())
        println("".isNullOrBlank())
        println(null.isNullOrBlank())
        println("aa".isNullOrBlank())

    }
}