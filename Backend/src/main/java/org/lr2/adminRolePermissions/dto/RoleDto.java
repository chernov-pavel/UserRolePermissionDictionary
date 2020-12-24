package org.lr2.adminRolePermissions.dto;

import org.lr2.adminRolePermissions.domain.PermissionEntity;
import org.lr2.adminRolePermissions.domain.RoleEntity;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class RoleDto {
    private UUID id;
    private String name;
    private Set<PermissionDto> permissions;

    public RoleDto(UUID id, String name, Set<PermissionDto> permissions) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }

    public RoleDto(RoleEntity roleEntity) {
        this.id = roleEntity.getId();
        this.name = roleEntity.getName();
        this.permissions = roleEntity.getPermissions()
                .stream()
                .map(PermissionDto::new)
                .collect(Collectors.toSet());
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

    public Set<PermissionDto> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<PermissionDto> permissions) {
        this.permissions = permissions;
    }
}
