package com.security.login.controllers

import com.security.login.constants.Constants
import com.security.login.dto.AuthenticationRequestDto
import com.security.login.dto.AuthenticationResponseDto
import com.security.login.dto.AuthenticationToken
import com.security.login.jwt.JwtTokenProvider
import com.security.login.service.AuthService
import com.security.login.service.RedisService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController (
    private val authService: AuthService,
    private val authenticationManagerBuilder: AuthenticationManagerBuilder,
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisService: RedisService,
    @Value("\${jwt.access}")
    private val accessTokenName : String,
    @Value("\${jwt.refresh}")
    private val refreshTokenName : String,
    ){

    @PostMapping("/login")
    fun login(@RequestBody authenticationRequestDto : AuthenticationRequestDto) : ResponseEntity<AuthenticationResponseDto> {
        val authenticationToken = UsernamePasswordAuthenticationToken(authenticationRequestDto.username, authenticationRequestDto.password)

        val authentication = authenticationManagerBuilder.`object`.authenticate(authenticationToken) //db에서 유저정보 확인, 가져옴
        SecurityContextHolder.getContext().authentication = authentication

        val issueTokenInCookie = jwtTokenProvider.issueToken(authentication)
        val accessTokenCookie = jwtTokenProvider.createCookie(accessTokenName, issueTokenInCookie.accessToken, "/")
        val refreshTokenCookie = jwtTokenProvider.createCookie(refreshTokenName, issueTokenInCookie.refreshToken, "/")

        redisService.save(Constants.REDIS_REFRESH_KEY, authenticationRequestDto.username, issueTokenInCookie.refreshToken)

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
            .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
            .body(AuthenticationResponseDto(authentication.name))

    }

    @PostMapping("/signup")
    fun signup(@RequestBody authenticationRequestDto : AuthenticationRequestDto) : ResponseEntity<AuthenticationResponseDto> {
        //회원가입 로직
        val authenticationResponseDto = authService.signup(authenticationRequestDto)

        return ResponseEntity.ok(authenticationResponseDto)

    }

    @PostMapping("/logout")
    fun logout(@RequestBody authenticationRequestDto: AuthenticationRequestDto) : ResponseEntity<AuthenticationResponseDto>{

        val accessTokenCookie = jwtTokenProvider.cleanCookie(accessTokenName, "/")
        val refreshTokenCookie = jwtTokenProvider.cleanCookie(refreshTokenName, "/")

        redisService.delete(Constants.REDIS_REFRESH_KEY, authenticationRequestDto.username)

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
            .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
            .body(AuthenticationResponseDto(authenticationRequestDto.username))
    }
}