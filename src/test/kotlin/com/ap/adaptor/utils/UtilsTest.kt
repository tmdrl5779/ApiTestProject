package com.ap.adaptor.utils

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class UtilsTest {

    @Test
    fun makeParam() {
        val param = mutableMapOf<String, String>()


        println(param.toString())
        val joinToString = param.map { "${it.key}=${it.value}" }.joinToString("&")

        println(joinToString)
    }

    @Test
    fun splitUrl(){

        val url = "www.example.com/test/asdf/123"

        val regex = Regex("^(https?://)?([^/]+)(/.*)?$")

        val matchResult = regex.find(url)

        if(matchResult != null){
            val baseurl = (matchResult.groups[1]?.value ?: "https://") + matchResult.groups[2]?.value ?: ""
            val path = matchResult.groups[3]?.value ?: ""
            println(baseurl)
            println(path)
        }
    }
}