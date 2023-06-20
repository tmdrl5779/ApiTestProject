package com.security.login.jwt

import com.security.login.constants.Constants
import com.security.login.service.RedisService
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpHeaders
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class JwtFilter(
    private val jwtTokenProvider: JwtTokenProvider,
    private val redisService: RedisService,
    @Value("\${jwt.access}")
    private val accessTokenName : String,
    @Value("\${jwt.refresh}")
    private val refreshTokenName : String
    ) : OncePerRequestFilter() {

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val accessToken: String? = jwtTokenProvider.getAccessTokenByCookie(request)

        if(accessToken != null && jwtTokenProvider.validateToken(accessToken, Constants.ACCESS_TOKEN)){

            //access 토큰 기간 확인
            if(jwtTokenProvider.validateExpiredToken(accessToken)){
                val authentication: Authentication = jwtTokenProvider.getAuthenticationByToken(accessToken)
                SecurityContextHolder.getContext().authentication = authentication
            }else{
                val refreshToken: String? = jwtTokenProvider.getRefreshTokenByCookie(request)

                //refresh 토큰 검증
                if(refreshToken != null && jwtTokenProvider.validateToken(refreshToken, Constants.REFRESH_TOKEN)){

                    var authentication = jwtTokenProvider.getAuthenticationByToken(accessToken)
                    val principal = authentication.principal as User
                    val username = principal.username

                    val refreshTokenForRedis = redisService.get(Constants.REDIS_REFRESH_KEY, username)

                    //refresh 토큰 redis 랑 비교
                    if(refreshToken == refreshTokenForRedis){
                        // access, refresh 재발급

                        val issueTokenInCookie = jwtTokenProvider.issueToken(authentication)
                        authentication = jwtTokenProvider.getAuthenticationByToken(issueTokenInCookie.accessToken)
                        SecurityContextHolder.getContext().authentication = authentication

                        val accessTokenCookie = jwtTokenProvider.createCookie(accessTokenName, issueTokenInCookie.accessToken, "/")
                        val refreshTokenCookie = jwtTokenProvider.createCookie(refreshTokenName, issueTokenInCookie.refreshToken, "/")

                        redisService.save(Constants.REDIS_REFRESH_KEY, username, issueTokenInCookie.refreshToken)

                        response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                        response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())


                    }

                }
                
            }
        }

        filterChain.doFilter(request, response)
    }
}