//package org.lr2.adminRolePermissions.services;
//
//import org.lr2.adminRolePermissions.persitences.entities.Permission;
//import org.lr2.adminRolePermissions.persitences.entities.Role;
//
//import java.util.List;
//import java.util.UUID;
//
//public interface IRoleService {
//    List<Role> getAll();
//    Role getById(UUID id);
//    Role add(String name, List<Permission> permissions);
//    Role addPermissions(List<Permission> permissions);
//    boolean isRoleNameUnique(String name);
//    void removeAll();
//    void removeById(UUID id);
//    Role update(UUID id, Role role);
//}
