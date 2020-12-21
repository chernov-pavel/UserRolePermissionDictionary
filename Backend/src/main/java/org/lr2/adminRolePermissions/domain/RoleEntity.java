package org.lr2.adminRolePermissions.domain;

import org.lr2.adminRolePermissions.persitences.entities.Role;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class RoleEntity {
    private UUID id;
    private String name;
    private Set<PermissionEntity> permissions;

    public RoleEntity(UUID id, String name, Set<PermissionEntity> permissions) {
        this.id = id;
        this.name = name;
        this.permissions = permissions;
    }
    public RoleEntity(Role role) {
        this.id = role.getId();
        this.name = role.getName();
        this.permissions = role.getPermissions()
                .stream()
                .map(PermissionEntity::new)
                .collect(Collectors.toSet());
    }

    public RoleEntity() {
        this.permissions = Set.of();
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

    public Set<PermissionEntity> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<PermissionEntity> permissions) {
        this.permissions = permissions;
    }
}
