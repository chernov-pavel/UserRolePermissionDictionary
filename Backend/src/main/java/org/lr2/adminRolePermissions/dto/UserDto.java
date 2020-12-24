package org.lr2.adminRolePermissions.dto;

import org.lr2.adminRolePermissions.domain.UserEntity;

import java.util.UUID;

public class UserDto {
    private UUID id;
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    private RoleDto role;

    public UserDto(UUID id,
                   String userName,
                   String password,
                   String firstName,
                   String lastName,
                   String email,
                   RoleDto role) {
        this.id = id;
        this.username = userName;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.role = role;
    }

    public UserDto(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.username = userEntity.getUserName();
        this.password = userEntity.getPassword();
        this.firstname = userEntity.getFirstName();
        this.lastname = userEntity.getLastName();
        this.email = userEntity.getEmail();
        if (userEntity.getRole() != null) {
            this.role = new RoleDto(userEntity.getRole());
        }
    }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public RoleDto getRole() {
        return role;
    }

    public void setRole(RoleDto role) {
        this.role = role;
    }
}
