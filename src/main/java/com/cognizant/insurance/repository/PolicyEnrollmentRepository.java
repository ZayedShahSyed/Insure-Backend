package com.cognizant.insurance.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;

@Repository
public interface PolicyEnrollmentRepository extends JpaRepository<PolicyEnrollment, Long> {
    List<PolicyEnrollment> findByCustomerId(Long customerId);

    List<PolicyEnrollment> findByPolicyPlan_Policy_Id(Long policyId);

    Optional<PolicyEnrollment> findByEnrollmentNumber(String enrollmentNumber);

    long countByStatus(EnrollmentStatus status);

    @Query("SELECT pe FROM PolicyEnrollment pe LEFT JOIN FETCH pe.enrollmentPeople LEFT JOIN FETCH pe.policyPlan pp LEFT JOIN FETCH pp.policy LEFT JOIN FETCH pe.customer WHERE pe.id = :id")
    Optional<PolicyEnrollment> findByIdWithDetails(Long id);

    @Query("SELECT DISTINCT pe FROM PolicyEnrollment pe LEFT JOIN FETCH pe.enrollmentPeople LEFT JOIN FETCH pe.policyPlan pp LEFT JOIN FETCH pp.policy LEFT JOIN FETCH pe.customer ORDER BY pe.createdAt DESC")
    List<PolicyEnrollment> findAllWithDetails();

    @Query("SELECT DISTINCT pe FROM PolicyEnrollment pe LEFT JOIN FETCH pe.enrollmentPeople LEFT JOIN FETCH pe.policyPlan pp LEFT JOIN FETCH pp.policy p LEFT JOIN FETCH pe.customer WHERE p.createdBy.id = :adminId ORDER BY pe.createdAt DESC")
    List<PolicyEnrollment> findByPolicyCreatorId(Long adminId);

    List<PolicyEnrollment> findByPolicyPlan_Policy_IdAndStatusIn(Long policyId, List<EnrollmentStatus> statuses);

    List<PolicyEnrollment> findByPolicyPlan_IdAndStatusIn(Long planId, List<EnrollmentStatus> statuses);
}


