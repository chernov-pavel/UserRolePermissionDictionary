package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.RoleEntity;
import org.lr2.adminRolePermissions.domain.RoleInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.persitences.entities.Permission;
import org.lr2.adminRolePermissions.persitences.entities.Role;
import org.lr2.adminRolePermissions.persitences.repositories.PermissionRepository;
import org.lr2.adminRolePermissions.persitences.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository, PermissionRepository permissionRepository) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
    }

    @Override
    public Page<RoleEntity> get(Pageable pageable) {
        var pagedRole = roleRepository.findAll(pageable);
        var pagedRoleEntity = pagedRole.map(RoleEntity::new);

        return pagedRoleEntity;
    }

    @Override
    public RoleEntity getById(UUID id) throws BusinessLogicException {
        var roleOptional = roleRepository.findById(id);
        if (roleOptional.isEmpty()) {
            throw new BusinessLogicException(ErrorCode.RoleNotExists);
        }
        return new RoleEntity(roleOptional.get());
    }

    @Override
    public RoleEntity add(RoleInput input) {
        var permissions = permissionRepository.findAllById(input.getPermissionIds());
        var role = roleRepository.save(new Role(input.getName(), Set.copyOf(permissions)));
        return new RoleEntity(role);
    }

    @Override
    public RoleEntity addPermissionsToRole(UUID id, List<UUID> permissionIds) {
        return null;
    }

    @Override
    public boolean isRoleNameUnique(String name) {
        var result = roleRepository.roleNameIsUnique(name);
        return result;
    }

    @Override
    public void removeById(UUID id) {
        roleRepository.deleteById(id);
    }

    @Override
    @Transactional
    public RoleEntity update(UUID id, RoleInput input) {
        var permissions = this.permissionRepository.findAllById(input.getPermissionIds());
        var role = roleRepository.getOne(id);
        role.setName(input.getName());
        role.setPermissions(new HashSet<Permission>(permissions));
        var newRole = roleRepository.save(role);

        return new RoleEntity(newRole);
    }

    @Override
    public List<RoleEntity> getAll() {
        return roleRepository.findAll()
                .stream()
                .map(RoleEntity::new)
                .collect(Collectors.toList());
    }
}
