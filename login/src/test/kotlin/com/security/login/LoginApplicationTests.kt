package com.security.login

import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.data.redis.core.RedisTemplate
import org.springframework.data.redis.core.HashOperations

import org.springframework.data.redis.core.ValueOperations




@SpringBootTest
class LoginApplicationTests(
) {

    @Autowired
    private val redisTemplate: RedisTemplate<String, Any>? = null

    @Test
    fun contextLoads() {
    }

    @Test
    fun testString() {
        // given
        val stringOperations: ValueOperations<String, Any> = redisTemplate!!.opsForValue()
        val key = "dddddd"

        stringOperations.set(key, "abc1222222222222")
    }

    @Test
    fun testHash() {
        // given
        val hashOperations: HashOperations<String, Any, Any> = redisTemplate!!.opsForHash()
        val key = "test3"

        hashOperations.put(key, "test", "test")
        hashOperations.put(key, "test2", "test")
        hashOperations.put(key, "test3", "test")

    }

    @Test
    fun testget() {
        // given
        val hashOperations: HashOperations<String, Any, Any> = redisTemplate!!.opsForHash()
        val key = "test"

        val any = hashOperations[key, "hello"]
        print("aaaaaaaaaaaaaaaaaaaaa\n$any")

    }


}
