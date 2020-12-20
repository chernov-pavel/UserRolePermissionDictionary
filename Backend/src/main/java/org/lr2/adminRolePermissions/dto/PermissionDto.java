package org.lr2.adminRolePermissions.dto;
import org.lr2.adminRolePermissions.domain.PermissionEntity;

import java.util.UUID;

public class PermissionDto {
    private UUID id;
    private String name;

    public PermissionDto(UUID id, String name) {
        this.id = id;
        this.name = name;
    }

    public PermissionDto(PermissionEntity permissionEntity) {
        this.id = permissionEntity.getId();
        this.name = permissionEntity.getName();
    }

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
