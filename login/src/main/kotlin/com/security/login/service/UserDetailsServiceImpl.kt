package com.security.login.service

import com.security.login.constants.Constants
import com.security.login.entity.User
import com.security.login.exception.DatabaseException
import com.security.login.exception.DuplicateException
import com.security.login.repository.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(
    private val userRepository: UserRepository
) : UserDetailsService{

    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByUsername(username)
        if(user == null){
            throw DatabaseException(Constants.CAN_NOT_FIND_DATA)
        }
        return createUserDetails(user)
    }

    private fun createUserDetails(user: User): org.springframework.security.core.userdetails.User{
        var grantedAuthorities: MutableList<GrantedAuthority> = mutableListOf()
        grantedAuthorities.add(SimpleGrantedAuthority(user.role!!.roleName))
        return org.springframework.security.core.userdetails.User(user.username, user.password, grantedAuthorities)
    }

}