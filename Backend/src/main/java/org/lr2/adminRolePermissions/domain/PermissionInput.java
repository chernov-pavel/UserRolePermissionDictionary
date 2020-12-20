package org.lr2.adminRolePermissions.domain;

import org.springframework.web.bind.annotation.RequestParam;

public class PermissionInput {
    private String name;

    public PermissionInput(String name) {
        this.name = name;
    }

    public PermissionInput() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
