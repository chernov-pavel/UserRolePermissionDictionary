package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.UserEntity;
import org.lr2.adminRolePermissions.domain.UserInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    Page<UserEntity> get(Pageable pageable);
    UserEntity getById(UUID id) throws BusinessLogicException;
    UserEntity add(UserInput input) throws BusinessLogicException;
    boolean isUsernameUnique(String username);
    void removeById(UUID id);
    UserEntity update(UUID id, UserInput input) throws BusinessLogicException;
    List<UserEntity> getAll();
}
