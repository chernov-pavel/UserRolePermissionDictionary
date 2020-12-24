package org.lr2.adminRolePermissions.domain;

import java.util.UUID;

public class UserInput {
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private String email;
    private UUID roleId;

    public UserInput(String userName, String password, String firstName, String lastName, String email, UUID roleId) {
        this.username = userName;
        this.password = password;
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.roleId = roleId;
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

    public UUID getRoleId() {
        return roleId;
    }

    public void setRoleId(UUID roleId) {
        this.roleId = roleId;
    }
}
