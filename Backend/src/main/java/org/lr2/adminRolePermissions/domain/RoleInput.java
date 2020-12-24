package org.lr2.adminRolePermissions.domain;

import java.util.List;
import java.util.UUID;

public class RoleInput {
    private String name;
    private List<UUID> permissionIds;

    public RoleInput(String name, List<UUID> permissionIds) {
        this.name = name;
        this.permissionIds = permissionIds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UUID> getPermissionIds() {
        return permissionIds;
    }

    public void setPermissionIds(List<UUID> permissionIds) {
        this.permissionIds = permissionIds;
    }

}
