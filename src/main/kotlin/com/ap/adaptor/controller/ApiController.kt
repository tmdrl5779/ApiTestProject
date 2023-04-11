package com.ap.adaptor.controller

import com.ap.adaptor.constants.Constants
import com.ap.adaptor.entity.Combination
import com.ap.adaptor.entity.RequestData
import com.ap.adaptor.entity.ResponseData
import com.ap.adaptor.service.AdaptorService
import com.ap.adaptor.service.CombinationApiService
import com.ap.adaptor.utils.logger
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Tag(name = "테스트", description = "API 테스트")
@RestController
class ApiController(
    val adaptorService: AdaptorService,
    val combinationApiService: CombinationApiService
) {

    val log = logger()

    @Operation(summary = "API 요청", description = "HTTP Method에 해당하는 API 요청")
    @PostMapping("/api/call")
    suspend fun callGetApi(@RequestBody requestData: RequestData):MutableList<ResponseData>{
        log.info("Api Call Request : $requestData")
        return adaptorService.responses(requestData)
    }

    @Operation(summary = "COMBINE", description = "API 조합 요청")
    @PostMapping("/api/combine")
    suspend fun callCombineApi(@RequestBody combination: Combination){
        log.info("Call COMBINE Request : $combination")
        combinationApiService.combineApis(combination)

    }
}