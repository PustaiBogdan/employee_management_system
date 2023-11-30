package com.dly.Employee.repository;

import com.dly.Employee.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity,Long> {
    List<EmployeeEntity> findByDepartmentId(Long departmentId);

    @Query("SELECT e FROM EmployeeEntity e WHERE e.managerId = 0")
    List<EmployeeEntity> findAllManagers();

    @Query("SELECT e FROM EmployeeEntity e WHERE e.managerId = :managerId")
    List<EmployeeEntity> findEmployeesByManagerId(@Param("managerId") Long managerId);
}
