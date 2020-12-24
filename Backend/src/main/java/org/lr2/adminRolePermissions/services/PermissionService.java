package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.PermissionEntity;
import org.lr2.adminRolePermissions.domain.PermissionInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.persitences.entities.Permission;
import org.lr2.adminRolePermissions.persitences.repositories.PermissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PermissionService implements IPermissionService {
    private final PermissionRepository permissionRepository;

    @Autowired
    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    @Override
    public List<PermissionEntity> get() {
        var permissions = permissionRepository.findAll();
        return permissions
                .stream()
                .map(PermissionEntity::new)
                .collect(Collectors.toList());
    }

    @Override
    public Page<PermissionEntity> getPagination(Pageable pageable) {
        var pagedPermission = permissionRepository.findAll(pageable);
        var pagedPermissionEntity = pagedPermission.map(PermissionEntity::new);

        return pagedPermissionEntity;
    }

    @Override
    public PermissionEntity getById(UUID id) throws BusinessLogicException {
        var permissionOptional = permissionRepository.findById(id);
        if (permissionOptional.isEmpty()) {
            throw new BusinessLogicException(ErrorCode.PermissionNotExists);
        }
        return new PermissionEntity(permissionOptional.get());
    }

    @Override
    public PermissionEntity add(String name) {
        var permission = permissionRepository.save(new Permission(name, Set.of()));
        return new PermissionEntity(permission);
    }

    @Override
    public boolean permissionNameIsUnique(String permissionName) {
       return permissionRepository.permissionNameIsUnique(permissionName);
    }

    @Override
    public boolean permissionExists(UUID id) {
        return permissionRepository.existsById(id);
    }

    @Override
    public void removeById(UUID id) {
        permissionRepository.deleteById(id);
    }

    @Override
    public PermissionEntity update(UUID id, PermissionInput input) {
        var permission = permissionRepository.getOne(id);
        permission.setName(input.getName());
        var newPermission = permissionRepository.save(permission);

        return new PermissionEntity(newPermission);
    }
}
