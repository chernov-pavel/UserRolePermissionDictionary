package org.lr2.adminRolePermissions;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.lr2.adminRolePermissions.controllers.PermissionController;
import org.lr2.adminRolePermissions.persitences.entities.Permission;
import org.lr2.adminRolePermissions.persitences.entities.Role;
import org.lr2.adminRolePermissions.persitences.repositories.PermissionRepository;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;


import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class PermissionEndpointTests {

    private MockMvc mockMvc;

    @Mock
    private PermissionRepository permissionRepository;

    @InjectMocks
    private PermissionController permissionController;


    private List<Permission> permissionList;

    @BeforeEach
    void setUp() {
        // We would need this line if we would not use the MockitoExtension
        // MockitoAnnotations.initMocks(this);
        // Here we can't use @AutoConfigureJsonTesters because there isn't a Spring context
        JacksonTester.initFields(this, new ObjectMapper());
        // MockMvc standalone approach
        mockMvc = MockMvcBuilders.standaloneSetup(permissionController)
                .build();
        this.permissionList = new ArrayList<>();
        this.permissionList.add(new Permission("edit", new HashSet<Role>()));
        this.permissionList.add(new Permission("update", new HashSet<Role>()));
        this.permissionList.add(new Permission("delete", new HashSet<Role>()));
    }

    @Test
    public void getAll() throws Exception {
        given(permissionRepository.findAll()).willReturn(permissionList);

        this.mockMvc.perform(get("api/permissions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)));
    }
}
