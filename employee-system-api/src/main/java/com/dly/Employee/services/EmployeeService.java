package com.dly.Employee.services;

import com.dly.Employee.model.Employee;

import java.util.List;

public interface EmployeeService {
     Employee getEmployeeById(Long id);

    Employee createEmployee(Employee employee);

    List<Employee> getAllEmployees();

    boolean deleteEmployee(Long id);

    Employee updateEmploye(Long id, Employee employee);
}