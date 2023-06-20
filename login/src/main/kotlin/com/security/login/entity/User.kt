package com.security.login.entity

import javax.persistence.*

@Entity
@Table(name = "tbl_user")
class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var username: String? =  null

    var password: String? = null

    @ManyToOne
    @JoinColumn(name = "role_id")
    var role: Role? = null
}
