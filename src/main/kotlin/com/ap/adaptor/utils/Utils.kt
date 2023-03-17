package com.ap.adaptor.utils

object Utils {

    fun makeParam(param: MutableMap<String, String>): String{
        return param.map{ "${it.key}=${it.value}" }.joinToString ( "&" )
    }

    fun splitUrl(url: String): Pair<String, String>{
        val regex = Regex("^(https?://)?([^/]+)(/.*)?$")
        val matchResult = regex.find(url)

        if(matchResult != null){
            val baseurl = (matchResult.groups[1]?.value ?: "https://") + matchResult.groups[2]?.value ?: ""
            val uri = matchResult.groups[3]?.value ?: ""
            return Pair(baseurl, uri)
        }

        return Pair("", "")
    }
}