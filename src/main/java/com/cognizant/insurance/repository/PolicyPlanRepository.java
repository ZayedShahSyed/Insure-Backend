package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.PolicyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PolicyPlanRepository extends JpaRepository<PolicyPlan, Long> {
    List<PolicyPlan> findByPolicyIdAndIsActiveTrue(Long policyId);

    Optional<PolicyPlan> findByIdAndIsActiveTrue(Long id);

    @Query("SELECT pp FROM PolicyPlan pp JOIN FETCH pp.policy WHERE pp.id = :id AND pp.isActive = true")
    Optional<PolicyPlan> findByIdWithPolicy(Long id);
}

