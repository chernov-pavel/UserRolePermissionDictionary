package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.PermissionEntity;
import org.lr2.adminRolePermissions.domain.PermissionInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.DoubleStream;

@Service
public interface IPermissionService {
    List<PermissionEntity> get();
    Page<PermissionEntity> getPagination(Pageable pageable);
    PermissionEntity getById(UUID id) throws BusinessLogicException;
    PermissionEntity add(String name);
    boolean permissionNameIsUnique(String name);
    boolean permissionExists(UUID id);
    void removeById(UUID id);
    PermissionEntity update(UUID id, PermissionInput input);

}
