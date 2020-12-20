//package org.lr2.adminRolePermissions.services;
//
//import org.lr2.adminRolePermissions.persitences.entities.Role;
//import org.lr2.adminRolePermissions.persitences.entities.User;
//import org.lr2.adminRolePermissions.persitences.repositories.IUserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.UUID;
//
//@Service
//public class UserService implements IUserService{
//    private final IUserRepository userRepository;
//
//    @Autowired
//    public UserService(IUserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public List<User> getAll() {
//        return null;
//    }
//
//    @Override
//    public User getById(UUID id) {
//        return null;
//    }
//
//    @Override
//    public User add(String username, String firstName, String lastName, List<Role> roles) {
//        return null;
//    }
//
//    @Override
//    public boolean isUsernameUnique(String username) {
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
//    public User update(UUID id, User user) {
//        return null;
//    }
//}
