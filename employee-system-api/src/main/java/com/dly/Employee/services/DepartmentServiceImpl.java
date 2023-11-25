package com.dly.Employee.services;

import com.dly.Employee.entity.DepartmentEntity;
import com.dly.Employee.model.Department;
import com.dly.Employee.repository.DepartmentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartmentServiceImpl implements  DepartmentService{
    private DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public Department createDepartment(Department department) {
        DepartmentEntity departmentEntity = new DepartmentEntity();
        BeanUtils.copyProperties(department, departmentEntity);
        departmentRepository.save(departmentEntity);
        Department returnDepartment = new Department();
        BeanUtils.copyProperties(departmentEntity, returnDepartment);
        return returnDepartment;
    }

    @Override
    public List<Department> getAllDepartments() {
        List<DepartmentEntity> employeeEntities = departmentRepository.findAll();
        return employeeEntities.stream().map(dep -> new Department(
                dep.getId(),
                dep.getDescription(),
                dep.getParentId())).collect(Collectors.toList());
    }

    @Override
    public boolean deleteleteDepartment(Long id) {
        Optional<DepartmentEntity> departmentOptional = departmentRepository.findById(id);
        if (departmentOptional.isPresent()) {
            departmentRepository.delete(departmentOptional.get());
            return true;
        }else{
            return false;
        }
    }
    @Override
    public Department updateDepartment(Long id, Department department) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id).get();

        departmentEntity.setDescription(department.getDescription());
        departmentEntity.setParentId(department.getParentId());
        departmentRepository.save(departmentEntity);
        return  department;
    }
    @Override
    public Department getDepartmentById(Long id) {
        DepartmentEntity departmentEntity = departmentRepository.findById(id).get();
        Department department = new Department();
        BeanUtils.copyProperties(departmentEntity,department);
        return department;
    }


}
