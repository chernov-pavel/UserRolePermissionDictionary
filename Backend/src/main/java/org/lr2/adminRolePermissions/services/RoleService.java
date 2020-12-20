//package org.lr2.adminRolePermissions.services;
//
//import org.lr2.adminRolePermissions.persitences.entities.Permission;
//import org.lr2.adminRolePermissions.persitences.entities.Role;
//import org.lr2.adminRolePermissions.persitences.repositories.IRoleRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.UUID;
//
//@Service
//public class RoleService implements IRoleService {
//    private final IRoleRepository roleRepository;
//
//    @Autowired
//    public RoleService(IRoleRepository roleRepository) {
//        this.roleRepository = roleRepository;
//    }
//
//    @Override
//    public List<Role> getAll() {
//        return null;
//    }
//
//    @Override
//    public Role getById(UUID id) {
//        return null;
//    }
//
//    @Override
//    public Role add(String name, List<Permission> permissions) {
//        return null;
//    }
//
//    @Override
//    public Role addPermissions(List<Permission> permissions) {
//        return null;
//    }
//
//    @Override
//    public boolean isRoleNameUnique(String name) {
//        return false;
//    }
//
//    @Override
//    public void removeAll() {
//
//    }
//
//    @Override
//    public void removeById(UUID id) {
//
//    }
//
//    @Override
//    public Role update(UUID id, Role role) {
//        return null;
//    }
//}
