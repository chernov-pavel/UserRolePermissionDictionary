package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.RoleEntity;
import org.lr2.adminRolePermissions.domain.RoleInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IRoleService {
    Page<RoleEntity> get(Pageable pageable);
    RoleEntity getById(UUID id) throws BusinessLogicException;
    RoleEntity add(RoleInput input);
    RoleEntity addPermissionsToRole(UUID id, List<UUID> permissionIds);
    boolean isRoleNameUnique(String name);
    void removeById(UUID id);
    RoleEntity update(UUID id, RoleInput input);
    List<RoleEntity> getAll();
}
