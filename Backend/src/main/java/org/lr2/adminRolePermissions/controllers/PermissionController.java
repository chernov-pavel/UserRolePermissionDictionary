package org.lr2.adminRolePermissions.controllers;

import org.lr2.adminRolePermissions.domain.PermissionInput;
import org.lr2.adminRolePermissions.dto.PermissionDto;
import org.lr2.adminRolePermissions.exceptions.BusinessLogicException;
import org.lr2.adminRolePermissions.exceptions.ErrorCode;
import org.lr2.adminRolePermissions.services.IPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/permissions")
public class PermissionController {
    private final IPermissionService permissionService;

    @Autowired
    public PermissionController(IPermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @GetMapping
    public List<PermissionDto> get(){
        return permissionService.get()
                .stream()
                .map(PermissionDto::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/paginated")
    public Page<PermissionDto> getPagination(@RequestParam int page, @RequestParam int size){
        var pageable = PageRequest.of(page, size);
        return permissionService.getPagination(pageable).map(PermissionDto::new);
    }

    @GetMapping("/{id}")
    public PermissionDto getById(@PathVariable UUID id) throws BusinessLogicException {
        var result = permissionService.getById(id);
        return new PermissionDto(result);
    }

    @PostMapping("/create")
    public PermissionDto add(@RequestBody PermissionInput input) throws BusinessLogicException {
        if (!permissionService.permissionNameIsUnique(input.getName())) {
            throw new BusinessLogicException(ErrorCode.PermissionNameNotUnique);
        }
        var result = permissionService.add(input.getName());

        return new PermissionDto(result);
    }

    @GetMapping("/checkname")
    public boolean checkPermissionName(@RequestParam String permissionName) {
        return permissionService.permissionNameIsUnique(permissionName);
    }

    @PutMapping("/{id}/update")
    public PermissionDto update(@PathVariable UUID id, @RequestBody PermissionInput input) throws BusinessLogicException {
        if (!permissionService.permissionNameIsUnique(input.getName())) {
            throw new BusinessLogicException(ErrorCode.PermissionNameNotUnique);
        }

        var result = permissionService.update(id, input);

        return new PermissionDto(result);
    }

    @DeleteMapping("/{id}/delete")
    public void delete(@PathVariable UUID id) throws BusinessLogicException {
        if (!permissionService.permissionExists(id)) {
            throw new BusinessLogicException(ErrorCode.PermissionNotExists);
        }

        permissionService.removeById(id);
    }
}
