package org.lr2.adminRolePermissions.controllers;

import org.lr2.adminRolePermissions.domain.UserInput;
import org.lr2.adminRolePermissions.dto.UserDto;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDto> getAll() {
        return userService.getAll()
                .stream()
                .map(UserDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/paginated")
    public Page<UserDto> get(@RequestParam int page, @RequestParam int size) {
        var pageable = PageRequest.of(page, size);
        var pagedUser = userService.get(pageable);
        var result = pagedUser.map(UserDto::new);

        return result;
    }

    @GetMapping("/{id}")
    public UserDto getById(@PathVariable UUID id) throws BusinessLogicException {
        var userEntity = userService.getById(id);
        return new UserDto(userEntity);
    }

    @PostMapping("/create")
    public UserDto add(@RequestBody UserInput input) throws BusinessLogicException {
        var userEntity = userService.add(input);
        var result = new UserDto(userEntity);
        return result;
    }

    @GetMapping("/checkusername")
    public boolean isUsernameUnique(@RequestParam String username) {
        return userService.isUsernameUnique(username);
    }

    @DeleteMapping("/{id}/delete")
    public void removeById(@PathVariable UUID id) {
        userService.removeById(id);
    }

    @PutMapping("/{id}/update")
    public UserDto update(@PathVariable UUID id, @RequestBody UserInput input) throws BusinessLogicException {
        var userEntity = userService.update(id, input);
        var result = new UserDto(userEntity);

        return result;
    }
}
