package com.dly.Employee.repository;

import com.dly.Employee.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository  extends JpaRepository<DepartmentEntity,Long> {

}
