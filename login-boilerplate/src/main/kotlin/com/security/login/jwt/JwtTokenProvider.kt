package com.security.login.jwt

import com.security.login.constants.Constants
import com.security.login.dto.AuthenticationToken
import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseCookie
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import org.springframework.web.util.WebUtils
import java.security.Key
import java.time.Duration
import java.util.*
import java.util.stream.Collectors
import javax.servlet.http.HttpServletRequest

@Component
class JwtTokenProvider(
    @Value("\${jwt.secret}")
    private val secret : String,
    @Value("\${jwt.access}")
    private val accessTokenName : String,
    @Value("\${jwt.refresh}")
    private val refreshTokenName : String,
    @Value("\${jwt.token-expiresIn}")
    private val jwtExp : Long

) : InitializingBean{

    private var key: Key ?= null

    override fun afterPropertiesSet() {
        val keyBytes = Decoders.BASE64.decode(secret)
        key = Keys.hmacShaKeyFor(keyBytes)
    }


    fun issueToken(authentication: Authentication): AuthenticationToken {
        val userName = authentication.name
        val accessToken = createAccessToken(authentication, Constants.ACCESS_TOKEN_MIN)
        val refreshToken = createRefreshToken(userName, Constants.REFRESH_TOKEN_MIN)

        return AuthenticationToken(accessToken, refreshToken)
    }

    fun createAccessToken(authentication: Authentication, expMin: Long): String {
        val authorities = authentication.authorities.stream()
            .map { obj: GrantedAuthority -> obj.authority }
            .collect(Collectors.joining(","))

        return Jwts.builder()
            .setSubject(authentication.name)
            .claim(Constants.AUTHORITY_NAME_IN_JWT, authorities)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().time + (jwtExp * expMin)))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }

    fun createRefreshToken(userName: String, expMin: Long): String {

        return Jwts.builder()
            .setSubject(userName)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().time + (jwtExp * expMin)))
            .signWith(key, SignatureAlgorithm.HS512)
            .compact()
    }

    fun createCookie(name: String, value: String, path: String): ResponseCookie{
        return ResponseCookie.from(name, value).path(path).maxAge(60 * Constants.COOKIE_MIN).httpOnly(true).build()
    }

    fun cleanCookie(name: String, path: String): ResponseCookie{
        return ResponseCookie.from(name, "").path(path).maxAge(Duration.ZERO).httpOnly(true).build()
    }

    fun getAuthenticationByToken(jwt: String) : Authentication{
        val claims: Claims = parseClaims(jwt)

        if(claims["auth"] == null){
            throw RuntimeException(Constants.NOT_FIND_AUTHORITY)
        }

        val authorities =
            Arrays.stream(claims["auth"].toString().split(",")
                .toTypedArray()
            ).map {
                role: String? -> SimpleGrantedAuthority(role)
            }.collect(Collectors.toList())

        val principal = User(claims.subject, "", authorities)
        return UsernamePasswordAuthenticationToken(principal, "", authorities)

    }

    fun getAccessTokenByCookie(request: HttpServletRequest): String? {
        return WebUtils.getCookie(request, accessTokenName)?.value
    }

    fun getRefreshTokenByCookie(request: HttpServletRequest): String? {
        return WebUtils.getCookie(request, refreshTokenName)?.value
    }

    fun validateToken(token: String, type: String): Boolean{
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            return true
        } catch (e: io.jsonwebtoken.security.SecurityException) {
//            logger.info("잘못된 JWT 서명입니다.")
        } catch (e: MalformedJwtException) {
//            logger.info("잘못된 JWT 서명입니다.")
        } catch (e: ExpiredJwtException) {
            if(type == Constants.ACCESS_TOKEN) return true
//            logger.info("만료된 JWT 토큰입니다.")
        } catch (e: UnsupportedJwtException) {
//            logger.info("지원되지 않는 JWT 토큰입니다.")
        } catch (e: IllegalArgumentException) {
//            logger.info("JWT 토큰이 잘못되었습니다.")
        }

        return false

    }
    fun validateExpiredToken(token: String): Boolean{
        return try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token)
            true
        } catch (e: ExpiredJwtException) {
            false
        }
    }

    fun parseClaims(jwt: String): Claims{
        return try{
            Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .body

        }catch (e: ExpiredJwtException){
            e.claims

        }
    }


}