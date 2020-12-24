package org.lr2.adminRolePermissions.controllers;

import org.lr2.adminRolePermissions.domain.RoleInput;
import org.lr2.adminRolePermissions.dto.RoleDto;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.services.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/roles")
public class RoleController {
    private final IRoleService roleService;

    @Autowired
    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<RoleDto> getAll() {
        return roleService.getAll()
                .stream()
                .map(RoleDto::new)
                .collect(Collectors.toList());
    }
    @GetMapping("/paginated")
    public Page<RoleDto> get(@RequestParam int page, @RequestParam int size) {
        var pageable = PageRequest.of(page, size);
        return roleService.get(pageable).map(RoleDto::new);
    }

    @GetMapping("/{id}")
    public RoleDto getById(@PathVariable UUID id) throws BusinessLogicException {
        var result = roleService.getById(id);
        return new RoleDto(result);
    }

    @PostMapping("/create")
    public RoleDto add(@RequestBody RoleInput input) throws BusinessLogicException {
        if (!roleService.isRoleNameUnique(input.getName())) {
            throw new BusinessLogicException(ErrorCode.RoleNameNotUnique);
        }
        var result = roleService.add(input);

        return new RoleDto(result);
    }

    @GetMapping("/{id}/addpermissions")
    public RoleDto addPermissionsToRole(@PathVariable UUID id, @RequestBody List<UUID> permissionIds) {
        var result = roleService.addPermissionsToRole(id, permissionIds);

        return new RoleDto(result);
    }

    @GetMapping("/checkname")
    public boolean isRoleNameUnique(@RequestParam String name) {
        return roleService.isRoleNameUnique(name);
    }

    @DeleteMapping("/{id/delete}")
    public void removeById(@PathVariable UUID id) {
        roleService.removeById(id);
    }

    @PutMapping("/{id}/update")
    public RoleDto update(@PathVariable UUID id, @RequestBody RoleInput input) {
        var result = roleService.update(id, input);

        return new RoleDto(result);
    }
}
