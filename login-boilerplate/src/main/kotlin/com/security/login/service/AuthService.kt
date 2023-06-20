package com.security.login.service

import com.security.login.constants.Constants
import com.security.login.dto.AuthenticationRequestDto
import com.security.login.dto.AuthenticationResponseDto
import com.security.login.entity.User
import com.security.login.exception.DuplicateException
import com.security.login.repository.RoleRepository
import com.security.login.repository.UserRepository
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val roleRepository: RoleRepository,
    private val passwordEncoder: PasswordEncoder
) {


    fun signup(authenticationRequestDto: AuthenticationRequestDto): AuthenticationResponseDto {
        //가입 여부 확인
        if (userRepository.findByUsername(authenticationRequestDto.username) != null) {
            throw DuplicateException(Constants.DUPLICATE_USERNAME)
        }

        val role = roleRepository.findByRoleName("ROLE_USER")

        //User Entity 생성 > todo mapstruct 쓰기
        val user = User()
        user.username = authenticationRequestDto.username
        user.password = passwordEncoder.encode(authenticationRequestDto.password)
        user.role = role

        //save > todo mapstruct 쓰기
        val newUser = userRepository.save(user)
        return AuthenticationResponseDto(newUser.username!!)
    }

}