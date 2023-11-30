package com.dly.Employee.services;

import com.dly.Employee.entity.EmployeeEntity;
import com.dly.Employee.model.Employee;
import com.dly.Employee.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements  EmployeeService {
    private  EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee getEmployeeById(Long id) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity,employee);
        return employee;
    }

    @Override
    public Employee createEmployee(Employee employee) {
        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);
        employeeRepository.save(employeeEntity);
        Employee returnEmpl = new Employee();
        BeanUtils.copyProperties(employeeEntity, returnEmpl);
        return returnEmpl;
    }

    @Override
    public List<Employee> getAllEmployees() {
        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
        return employeeEntities.stream().map(emp -> new Employee(
                emp.getId(),
                emp.getFirstName(),
                emp.getLastName(),
                emp.getEmailId(),
                emp.getManagerId(),
                emp.getDepartmentId())).collect(Collectors.toList());
    }

    @Override
    public boolean deleteEmployee(Long id) {
        Optional<EmployeeEntity> employeeOptional = employeeRepository.findById(id);
        if (employeeOptional.isPresent()) {
            employeeRepository.delete(employeeOptional.get());
            return true;
        }else{
            return false;
        }
    }

    @Override
    public Employee updateEmploye(Long id, Employee employee) {
        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();

        employeeEntity.setEmailId(employee.getEmailId());
        employeeEntity.setFirstName(employee.getFirstName());
        employeeEntity.setLastName(employee.getLastName());
        employeeEntity.setManagerId(employee.getManagerId());
        employeeEntity.setDepartmentId(employee.getDepartmentId());

        employeeRepository.save(employeeEntity);
        return  employee;
    }

    @Override
    public List<Employee> getEmployeesByDepartment(Long departmentId) {
        List<EmployeeEntity> employeeEntities = employeeRepository.findByDepartmentId(departmentId);
        return employeeEntities.stream().map(emp -> new Employee(
                emp.getId(),
                emp.getFirstName(),
                emp.getLastName(),
                emp.getEmailId(),
                emp.getManagerId(),
                emp.getDepartmentId())).collect(Collectors.toList());
    }
    public List<EmployeeEntity> findAllManagers() {
        return employeeRepository.findAllManagers();
    }


    @Override
    public List<Employee> getEmployeesByManager(Long managerId) {
        List<EmployeeEntity> employeeEntities = employeeRepository.findEmployeesByManagerId(managerId);
        return employeeEntities.stream().map(emp -> new Employee(
                emp.getId(),
                emp.getFirstName(),
                emp.getLastName(),
                emp.getEmailId(),
                emp.getManagerId(),
                emp.getDepartmentId())).collect(Collectors.toList());
    }

//    @Override
//    public List<EmployeeEntity> getAllEmployees() {
//        List<EmployeeEntity> employeeEntities = employeeRepository.findAll();
////        return employeeEntities.stream().map(emp -> new Employee(
////                emp.getId(),
////                emp.getFirstName(),
////                emp.getLastName(),
////                emp.getEmailId())).collect(Collectors.toList());
//        return employeeEntities;
    }
