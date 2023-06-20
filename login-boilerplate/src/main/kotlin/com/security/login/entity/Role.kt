package com.security.login.entity

import javax.persistence.*

@Entity
@Table(name = "tbl_role")
class Role{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    var roleName: String? = null

    @OneToMany(mappedBy = "role")
    var user:MutableSet<User>? = mutableSetOf()

}
