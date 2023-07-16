package com.ap.adaptor.utils

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
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
    fun mapToObject(){

        var json = "{\n" +
                "  \"Name\" : \"투케이\",\n" +
                "  \"Age\" : 30\n," +
//                "  \"BookList\" : [\n" +
//                "    {\"idx\" : 1, \"Name\" : \"JAVA\"},\n" +
//                "    {\"idx\" : 2, \"Name\" : \"Android\"},\n" +
//                "    {\"idx\" : 3, \"Name\" : \"Kotlin\"}\n" +
//                "  ],\n" +
                "  \"Hobby\" : \"Name\"\n" +
//                "  \"Address\" : {\"Addr\" : [{\"Name\":\"yeoungju\"}, {\"Name\":\"seoul\"}]}\n" +
                "}";

        val objectMapper = jacksonObjectMapper()
        val map = objectMapper.readValue(json, MutableMap::class.java)

        val people:People = objectMapper.convertValue(map, People::class.java)

        println(people.toString())

    }

    @Test
    fun stringBlankTest(){
        println(" ".isNullOrBlank())
        println("".isNullOrBlank())
        println(null.isNullOrBlank())
        println("aa".isNullOrBlank())

    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    data class People(
        var Name: String = "",
        var Age: Int = 0,
        var test: String = ""
    )
}