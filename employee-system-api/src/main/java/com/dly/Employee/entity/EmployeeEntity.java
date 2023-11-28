package com.dly.Employee.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
@Entity
@Data
@Table(name="employees")
public class EmployeeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String emailId;

    @Column(name = "manager_id",nullable = true)
    @ColumnDefault("0")
    private  Long managerId = 0L;

    @Column(name = "department_id",nullable = true)
    @ColumnDefault("0")
    private  Long departmentId = 0L;



    @PrePersist
    @PreUpdate
    private void prePersistPreUpdate() {
        if (managerId == null) {
            managerId = 0L;
        }
        if (departmentId == null) {
            departmentId = 0L;
        }
    }
}
