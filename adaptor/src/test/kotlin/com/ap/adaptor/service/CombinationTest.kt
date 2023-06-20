package com.ap.adaptor.service

import org.junit.jupiter.api.Test

class CombinationTest {

    @Test
    fun findValueTest(){

        var path = "key1.key2.key3"

        val map = mutableMapOf<String, Any>()
        val map2 = mutableMapOf<String, Any>()
        val map3 = mutableMapOf<String, Any>()
        val list = mutableListOf<String>()

        list.add("1")
        list.add("2")
        list.add("3")

        map3["key3"] = list
        map2["key2"] = map3
        map["key1"] = map2

        println(findValue(map, path))

    }

    fun findValue(response: MutableMap<String, Any>, path: String): Any{

        val pathSplit = path.split(".")

        var tmpResponse = response

        for(key in pathSplit){

            val value = tmpResponse[key]

            if(value is MutableMap<*, *>){
                tmpResponse = value as MutableMap<String, Any>
            }else{
                return value!!
            }
        }

        return tmpResponse

    }
}