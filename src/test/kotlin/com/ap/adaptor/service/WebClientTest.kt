package com.ap.adaptor.service

import com.ap.adaptor.entity.ResponseData
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.util.StopWatch
import org.springframework.web.reactive.function.client.WebClient
import org.springframework.web.reactive.function.client.WebClientResponseException
import org.springframework.web.reactive.function.client.awaitBody
import reactor.core.publisher.Mono
import kotlin.system.measureTimeMillis

@SpringBootTest
class WebClientTest {


    @Autowired
    lateinit var webClient: WebClient

    @Test
    fun `Test main`() = runBlocking<Unit>{

        val response = `call api coroutine test`()

        println(response)
    }



    suspend fun `call api coroutine test`(): MutableList<ResponseData> = coroutineScope{


        var response = mutableListOf<ResponseData>()


//        val value = responseApiWithTime()
//        response.add(value)


        val measureTime = measureTimeMillis {
            val value = List(10){ async { responseApiWithTime() }}
            val resultValue = value.awaitAll()
            response = resultValue as MutableList<ResponseData>
        }

        response
    }

    suspend fun responseApiWithTime(): ResponseData {
        val stopWatch = StopWatch()
        stopWatch.start()
        val response = `suspend webclient Test`()
        stopWatch.stop()

        response.responseTime = stopWatch.totalTimeMillis
        return response
    }


    suspend fun `suspend webclient Test`(): ResponseData{

        val responseData = ResponseData()

        try{
            val response = webClient.mutate()
                .baseUrl("https://jsonplaceholder.typicode.com")
                .build()
                .get()
                .uri("/todos/1")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .awaitBody<MutableMap<String, Any>>()

            responseData.body = response
            responseData.status = HttpStatus.OK.toString()
        }catch (e: WebClientResponseException){
            responseData.status = e.statusCode.toString()
        }

        return responseData
    }


    @Test
    fun `suspend webclient Test2`() = runBlocking<Unit>{

        val responseData = ResponseData()

        try{
            val response = webClient.mutate()
                .baseUrl("https://jsonplaceholder.typicode.com")
                .build()
                .get()
                .uri("/todos/1")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .awaitBody<MutableMap<String, Any>>()

            responseData.body = response
            responseData.status = HttpStatus.OK.toString()
        }catch (e: WebClientResponseException){
            responseData.status = e.statusCode.toString()
        }

        println(responseData)
    }

    @Test
    fun `WebClient Response Test`() {

        val response = webClient.mutate()
            .baseUrl("https://jsonplaceholder.typicode.com")
            .build()
            .get()
            .uri("/todos/1")
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(MutableMap::class.java)
            .map { ResponseData(0, "", it as MutableMap<String, Any>) }
            .block()

        println(response)
    }


    @Test
    fun `WebClient Response Test2`() {

        val response = webClient.mutate()
            .baseUrl("https://jsonplaceholder.typicode.com")
            .build()
            .get()
            .uri("/todos/1")
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError) {
                Mono.error<ResponseException>(ResponseException(HttpStatus.NOT_FOUND, "Not Found"))
            }
            .bodyToMono(MutableMap::class.java)
            .map{ResponseData(0, HttpStatus.OK.toString(), it as MutableMap<String, Any>)}
            .onErrorResume(ResponseException::class.java) { ex ->
                Mono.just(ResponseData(0, ex.status.value().toString()))
            }
            .block()

        println(response)
    }

    @Test
    fun `WebClient Response Test3`() {

        val response = webClient.mutate()
            .baseUrl("https://jsonplaceholder.typicode.com")
            .build()
            .get()
            .uri("/todos/1")
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(ResponseData::class.java)
            .map { map -> ResponseEntity.ok(map) }
            .onErrorResume(ResponseException::class.java) { ex ->
                Mono.just(ResponseEntity.status(ex.status)
                    .body(ResponseData(0, ex.status.value().toString())))
            }
            .block()

        println(response)
    }

//    @Test
//    fun `WebClient Response Test3`() {
//        print("test")
//
//        val response = webClient.mutate()
//            .baseUrl("https://jsonplaceholder.typicode.com")
//            .build()
//            .get()
//            .uri("/todos/1/test")
//            .accept(MediaType.APPLICATION_JSON)
//            .retrieve()
//            .bodyToMono(ResponseData::class.java)
//            .map { map -> ResponseEntity.ok(map) }
//            .onErrorReturn({ ex:Throwable ->
//                Mono.just(ResponseEntity(ResponseData(0, ex.toString())))
//            })
//            .block()
//
//        println(response)
//    }

    data class ResponseData(
        var responseTime: Long = 0,
        var status: String = "",
        var body: MutableMap<String, Any> = mutableMapOf()
    )

    class ResponseException(val status: HttpStatus, message: String) : RuntimeException(message)
}