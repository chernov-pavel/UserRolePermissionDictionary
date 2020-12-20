//package org.lr2.adminRolePermissions.persitences.entities;
//
//import javax.persistence.*;
//import java.util.Set;
//import java.util.UUID;
//
//@Entity
//@Table(name="roles")
//public class Role {
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private UUID id;
//
//    @Column(nullable = false)
//    private String name;
//
////    @OneToMany(mappedBy="role", fetch = FetchType.EAGER)
//    private Set<Permission> permissions;
//
//    public Role(UUID id, String name, Set<Permission> permissions) {
//        this.id = id;
//        this.name = name;
//        this.permissions = permissions;
//    }
//
//    public Role() {
//
//    }
//
//    public UUID getId() {
//        return id;
//    }
//
//    public void setId(UUID id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Set<Permission> getPermissions() {
//        return permissions;
//    }
//
//    public void setPermissions(Set<Permission> permissions) {
//        this.permissions = permissions;
//    }
//}
