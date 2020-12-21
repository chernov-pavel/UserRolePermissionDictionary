package org.lr2.adminRolePermissions.domain;

import java.util.List;

public class RoleInput {
    private String name;
    private List<Integer> permissionIds;

    public RoleInput(String name, List<Integer> permissionIds) {
        this.name = name;
        this.permissionIds = permissionIds;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getPermissionIds() {
        return permissionIds;
    }

    public void setPermissionIds(List<Integer> permissionIds) {
        this.permissionIds = permissionIds;
    }

}
