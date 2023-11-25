package com.dly.Employee.controller;

import com.dly.Employee.model.Department;
import com.dly.Employee.services.DepartmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1")
public class DepartmentController {
    public DepartmentService departmentService;
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping("/departments")
    public Department createDepartment(@RequestBody Department department){ return departmentService.createDepartment(department);}

    @GetMapping("/departments")
    public List<Department> getAllDepartments(){
        return departmentService.getAllDepartments();
    }


    @DeleteMapping("/departments/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteDepartment(@PathVariable Long id){
        boolean deleted = true;
        deleted = departmentService.deleteleteDepartment(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",deleted);
        return  ResponseEntity.ok(response);
    }

    @GetMapping("/departments/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id){
        Department department = null;
        department = departmentService.getDepartmentById(id);
        return  ResponseEntity.ok(department);
    }

    @PutMapping("/departments/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department){
        department = departmentService.updateDepartment(id, department);
        return  ResponseEntity.ok(department);
    }
}
