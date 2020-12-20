package org.lr2.adminRolePermissions.controllers;

import org.lr2.adminRolePermissions.domain.PermissionInput;
import org.lr2.adminRolePermissions.dto.PermissionDto;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.services.IPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/permissions")
public class PermissionController {
    private final IPermissionService permissionService;

    @Autowired
    public PermissionController(IPermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping("")
    public Page<PermissionDto> getAll(@RequestParam int page, @RequestParam int size){
        var pageable = PageRequest.of(page, size);
        return permissionService.get(pageable).map(PermissionDto::new);
    }

    @GetMapping("/{id}")
    public PermissionDto getById(@PathVariable UUID id) throws BusinessLogicException {
        var result = permissionService.getById(id);
        return new PermissionDto(result);
    }

    @PostMapping("/add")
    public PermissionDto add(@RequestBody PermissionInput input) throws BusinessLogicException {
        if (!permissionService.permissionNameIsUnique(input.getName())) {
            throw new BusinessLogicException(ErrorCode.PermissionNameNotUnique);
        }
        var result = permissionService.add(input.getName());

        return new PermissionDto(result);
    }

    @PutMapping("/{id}/update")
    public PermissionDto update(@PathVariable UUID id, @RequestBody PermissionInput input) throws BusinessLogicException {
        if (!permissionService.permissionNameIsUnique(input.getName())) {
            throw new BusinessLogicException(ErrorCode.PermissionNameNotUnique);
        }

        var result = permissionService.update(id, input);

        return new PermissionDto(result);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) throws BusinessLogicException {
        if (!permissionService.permissionExists(id)) {
            throw new BusinessLogicException(ErrorCode.PermissionNotExists);
        }

        permissionService.removeById(id);
    }
}
