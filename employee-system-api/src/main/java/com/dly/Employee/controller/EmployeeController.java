package com.dly.Employee.controller;

import com.dly.Employee.entity.EmployeeEntity;
import com.dly.Employee.model.EmailRequest;
import com.dly.Employee.model.Employee;
import com.dly.Employee.services.EmailService;
import com.dly.Employee.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final EmailService emailService;
    public EmployeeController(EmployeeService employeeService, EmailService emailService) {
        this.employeeService = employeeService;
        this.emailService = emailService;
    }

    @PostMapping("/sendEmail")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendSimpleMessage(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
    }




    @PostMapping("/users")
    public Employee createEmployee(@RequestBody Employee employee){
        return employeeService.createEmployee(employee);
    }

//    @GetMapping("/employees")
//    public List<Employee> getEmployee(@RequestBody Employee employee){
//        return employeeService.createEmployee(employee);
//    }

    @GetMapping("/users")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        boolean deleted = true;
        deleted = employeeService.deleteEmployee(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",deleted);
        return  ResponseEntity.ok(response);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = null;
        employee = employeeService.getEmployeeById(id);
        return  ResponseEntity.ok(employee);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        employee = employeeService.updateEmploye(id, employee);
        return  ResponseEntity.ok(employee);
    }

    @GetMapping("/users/department/{departmentId}")
    public List<Employee> getEmployeesByDepartment(@PathVariable Long departmentId){
        return employeeService.getEmployeesByDepartment(departmentId);
    }

    @GetMapping("/managers")
    public List<EmployeeEntity> getAllManagers() {
        return employeeService.findAllManagers();
    }

    @GetMapping("/users/manager/{managerId}")
    public List<Employee> getEmployeesByManager(@PathVariable Long managerId){
        return employeeService.getEmployeesByManager(managerId);
    }
}
