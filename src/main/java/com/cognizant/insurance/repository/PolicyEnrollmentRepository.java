package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyEnrollmentRepository extends JpaRepository<PolicyEnrollment, Long> {
    List<PolicyEnrollment> findByCustomerId(Long customerId);

    List<PolicyEnrollment> findByPolicyPlan_Policy_Id(Long policyId);

    Optional<PolicyEnrollment> findByEnrollmentNumber(String enrollmentNumber);

    long countByStatus(EnrollmentStatus status);

    @Query("SELECT pe FROM PolicyEnrollment pe LEFT JOIN FETCH pe.enrollmentPeople LEFT JOIN FETCH pe.policyPlan pp LEFT JOIN FETCH pp.policy LEFT JOIN FETCH pe.customer WHERE pe.id = :id")
    Optional<PolicyEnrollment> findByIdWithDetails(Long id);
}


