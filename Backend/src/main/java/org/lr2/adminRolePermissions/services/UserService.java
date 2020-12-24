package org.lr2.adminRolePermissions.services;

import org.lr2.adminRolePermissions.domain.UserEntity;
import org.lr2.adminRolePermissions.domain.UserInput;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.persitences.entities.Role;
import org.lr2.adminRolePermissions.persitences.entities.User;
import org.lr2.adminRolePermissions.persitences.repositories.RoleRepository;
import org.lr2.adminRolePermissions.persitences.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public Page<UserEntity> get(Pageable pageable) {
        var pagedUser = userRepository.findAll(pageable);
        var pagedUserEntity = pagedUser.map(UserEntity::new);

        return pagedUserEntity;
    }

    @Override
    public UserEntity getById(UUID id) throws BusinessLogicException {
        var userOptional = userRepository.findById(id);
        if (userOptional.isEmpty()) {
            throw new BusinessLogicException(ErrorCode.UserNotExists);
        }
        return new UserEntity(userOptional.get());
    }

    @Override
    public UserEntity add(UserInput input) throws BusinessLogicException {
        Optional<Role> roleOptional = null;
        if (input.getRoleId() != null) {
            roleOptional = roleRepository.findById(input.getRoleId());
            if (roleOptional.isEmpty()) {
                throw new BusinessLogicException(ErrorCode.RoleNotExists);
            }
        }
        var user = userRepository.save(
                new User(input.getUsername(),
                    input.getPassword(),
                    input.getFirstname(),
                    input.getLastname(),
                    input.getEmail(),
                    roleOptional == null ? null : roleOptional.get()));


        return new UserEntity(user);
    }

    @Override
    public boolean isUsernameUnique(String username) {
        return userRepository.usernameIsUnique(username);
    }

    @Override
    public void removeById(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity update(UUID id, UserInput input) throws BusinessLogicException {
        var roleOptional = roleRepository.findById(input.getRoleId());
        if (roleOptional.isEmpty()) {
            throw new BusinessLogicException(ErrorCode.RoleNotExists);
        }
        var user = userRepository.getOne(id);
        user.setEmail(input.getEmail());
        user.setUserName(input.getUsername());
        user.setFirstName(input.getFirstname());
        user.setPassword(input.getPassword());
        user.setLastName(input.getLastname());
        user.setRole(roleOptional.get());
        var newUser = userRepository.save(user);

        return new UserEntity(newUser);
    }

    @Override
    public List<UserEntity> getAll() {
        return userRepository.findAll()
                .stream()
                .map(UserEntity::new)
                .collect(Collectors.toList());
    }
}
