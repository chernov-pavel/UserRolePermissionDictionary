package org.lr2.adminRolePermissions.domain;

import org.lr2.adminRolePermissions.persitences.entities.Permission;

import java.util.UUID;

public class PermissionEntity {
    private UUID id;
    private String name;

    public PermissionEntity(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public PermissionEntity(Permission permission) {
        this.id = permission.getId();
        this.name = permission.getName();
    }

    public PermissionEntity() {}

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
