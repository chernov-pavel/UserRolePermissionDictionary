package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.RoleEntity;
import org.lr2.adminRolePermissions.domain.RoleInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.persitences.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoleService implements IRoleService {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
    public RoleEntity add(String name, List<Integer> permissionIds) {
        return null;
    }

    @Override
    public RoleEntity addPermissionsToRole(UUID id, List<Integer> permissionIds) {
        return null;
    }

    @Override
    public boolean isRoleNameUnique(String name) {
        return roleRepository.roleNameIsUnique(name);
    }

    @Override
    public void removeById(UUID id) {
        roleRepository.deleteById(id);
    }

    @Override
    public RoleEntity update(UUID id, RoleInput input) {
        var role = roleRepository.getOne(id);
        role.setName(input.getName());
        var newRole = roleRepository.save(role);

        return new RoleEntity(newRole);
    }
}
