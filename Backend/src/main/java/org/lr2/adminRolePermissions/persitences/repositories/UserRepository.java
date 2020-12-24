package org.lr2.adminRolePermissions.persitences.repositories;

import org.lr2.adminRolePermissions.persitences.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("select case when count(u)> 0 then false else true end from User u where lower(u.userName) = lower(:name)")
    boolean usernameIsUnique(@Param("name") String name);
}
