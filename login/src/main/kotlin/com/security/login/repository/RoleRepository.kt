package com.security.login.repository

import com.security.login.entity.Role
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository : JpaRepository<Role, Long>{

    fun findByRoleName(roleName: String): Role?
}