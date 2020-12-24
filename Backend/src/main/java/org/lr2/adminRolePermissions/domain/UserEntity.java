package org.lr2.adminRolePermissions.domain;

import org.lr2.adminRolePermissions.persitences.entities.User;

import java.util.UUID;

public class UserEntity {
    private UUID id;
    private String userName;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private RoleEntity role;

    public UserEntity(UUID id,
                      String userName,
                      String password,
                      String firstName,
                      String lastName,
                      String email,
                      RoleEntity role) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }

    public UserEntity(User user) {
        this.id = user.getId();
        this.userName = user.getUserName();
        this.password = user.getPassword();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        if (user.getRole() != null) {
            this.role = new RoleEntity(user.getRole());
        }
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public RoleEntity getRole() {
        return role;
    }

    public void setRole(RoleEntity role) {
        this.role = role;
    }
}
