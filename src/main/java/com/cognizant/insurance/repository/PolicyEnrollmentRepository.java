package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyEnrollmentRepository extends JpaRepository<PolicyEnrollment, Long> {
    List<PolicyEnrollment> findByCustomerId(Long customerId);
    List<PolicyEnrollment> findByStatus(EnrollmentStatus status);
    List<PolicyEnrollment> findByCustomerIdAndStatus(Long customerId, EnrollmentStatus status);

}