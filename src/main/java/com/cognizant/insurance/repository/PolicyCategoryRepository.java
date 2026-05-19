package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.PolicyCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyCategoryRepository extends JpaRepository<PolicyCategory, Long> {
    boolean existsByName(String name);
    List<PolicyCategory> findByIsActiveTrue();
}
