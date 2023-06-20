package com.security.login.service

import org.springframework.data.redis.core.HashOperations
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.stereotype.Service

@Service
class RedisService(
    private val redisTemplate: RedisTemplate<String, Any>
) {

    fun save(key: String, hashKey: String, value: String){
        val hashOperations: HashOperations<String, Any, Any> = redisTemplate.opsForHash()
        hashOperations.put(key, hashKey, value)
    }

    fun get(key: String, hashKey: String): Any {
        val hashOperations: HashOperations<String, Any, Any> = redisTemplate.opsForHash()
        return hashOperations[key, hashKey]!!
    }

    fun delete(key: String, hashKey: String) {
        val hashOperations: HashOperations<String, Any, Any> = redisTemplate.opsForHash()
        hashOperations.delete(key, hashKey)

    }
}