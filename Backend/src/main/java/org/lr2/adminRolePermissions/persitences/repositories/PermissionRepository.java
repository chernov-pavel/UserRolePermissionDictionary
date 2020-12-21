package org.lr2.adminRolePermissions.persitences.repositories;

import org.lr2.adminRolePermissions.persitences.entities.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    @Query("select case when count(p)> 0 then false else true end from Permission p where lower(p.name) = lower(:name)")
    boolean permissionNameIsUnique(@Param("name") String name);
}
