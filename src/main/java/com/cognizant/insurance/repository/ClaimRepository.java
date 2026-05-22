package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.Claim;
import com.cognizant.insurance.entity.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {

    List<Claim> findByCustomerId(Long customerId);

    List<Claim> findByStatus(ClaimStatus status);

    Optional<Claim> findByClaimNumber(String claimNumber);

    long countByStatus(ClaimStatus status);

    long countByStatusAndReviewedAtAfter(ClaimStatus status, LocalDateTime after);

    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.customer LEFT JOIN FETCH c.enrollment e LEFT JOIN FETCH e.policyPlan pp LEFT JOIN FETCH pp.policy LEFT JOIN FETCH c.reviewedBy WHERE c.id = :id")
    Optional<Claim> findByIdWithDetails(Long id);

    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.customer LEFT JOIN FETCH c.enrollment e LEFT JOIN FETCH e.policyPlan pp LEFT JOIN FETCH pp.policy WHERE c.customer.id = :customerId")
    List<Claim> findByCustomerIdWithDetails(Long customerId);

    List<Claim> findByEnrollmentId(Long enrollmentId);

    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.customer LEFT JOIN FETCH c.enrollment e LEFT JOIN FETCH e.policyPlan pp LEFT JOIN FETCH pp.policy p WHERE p.createdBy.id = :adminId ORDER BY c.createdAt DESC")
    List<Claim> findByPolicyCreatorId(Long adminId);

    @Query("SELECT c FROM Claim c LEFT JOIN FETCH c.customer LEFT JOIN FETCH c.enrollment e LEFT JOIN FETCH e.policyPlan pp LEFT JOIN FETCH pp.policy p WHERE p.createdBy.id = :adminId AND c.status = :status ORDER BY c.createdAt DESC")
    List<Claim> findByPolicyCreatorIdAndStatus(Long adminId, ClaimStatus status);
}


