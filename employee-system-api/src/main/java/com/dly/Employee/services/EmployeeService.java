package com.dly.Employee.services;

import com.dly.Employee.entity.EmployeeEntity;
import com.dly.Employee.model.Employee;

import java.util.List;

public interface EmployeeService {
     Employee getEmployeeById(Long id);

    Employee createEmployee(Employee employee);

    List<Employee> getAllEmployees();

    boolean deleteEmployee(Long id);

    Employee updateEmploye(Long id, Employee employee);

    List<Employee> getEmployeesByDepartment(Long departmentId);

    List<EmployeeEntity> findAllManagers();

    List<Employee> getEmployeesByManager(Long managerId);
}
