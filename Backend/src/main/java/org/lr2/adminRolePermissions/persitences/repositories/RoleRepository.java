package org.lr2.adminRolePermissions.persitences.repositories;

import org.lr2.adminRolePermissions.persitences.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {
    @Query("select case when count(r)> 0 then false else true end from Role r where lower(r.name) = lower(:name)")
    boolean roleNameIsUnique(@Param("name") String name);
}
