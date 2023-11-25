package com.dly.Employee.services;


import com.dly.Employee.model.Department;

import java.util.List;

public interface DepartmentService {
    Department createDepartment(Department department);

    List<Department> getAllDepartments();

    boolean deleteleteDepartment(Long id);

    Department getDepartmentById(Long id);

    Department updateDepartment(Long id, Department department);
}
