package com.cognizant.insurance.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cognizant.insurance.dto.PolicyPlanRequest;
import com.cognizant.insurance.dto.PolicyPlanResponse;
import com.cognizant.insurance.entity.Policy;
import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.PolicyPlan;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.entity.enums.PremiumBasis;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.PolicyPlanRepository;
import com.cognizant.insurance.repository.PolicyRepository;

@Service
public class PolicyPlanService {

    private final PolicyPlanRepository policyPlanRepository;
    private final PolicyRepository policyRepository;
    private final PolicyEnrollmentRepository enrollmentRepository;

    public PolicyPlanService(PolicyPlanRepository policyPlanRepository,
                             PolicyRepository policyRepository,
                             PolicyEnrollmentRepository enrollmentRepository) {
        this.policyPlanRepository = policyPlanRepository;
        this.policyRepository = policyRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Transactional
    public PolicyPlanResponse createPlan(Long policyId, PolicyPlanRequest request, Long adminId) {
        Policy policy = policyRepository.findByIdWithRelations(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found with id: " + policyId));
        validateOwnership(policy, adminId);

        PolicyPlan plan = new PolicyPlan();
        plan.setPolicy(policy);
        plan.setPlanName(request.getPlanName());
        plan.setCoverageAmount(request.getCoverageAmount());
        plan.setPremiumAmount(request.getPremiumAmount());
        if (request.getPremiumBasis() != null) {
            plan.setPremiumBasis(PremiumBasis.valueOf(request.getPremiumBasis()));
        }
        plan.setTenureOptions(request.getTenureOptions());
        plan.setMaxMembers(request.getMaxMembers());
        plan.setRoomRentLimit(request.getRoomRentLimit());
        plan.setRenewalAllowed(request.getRenewalAllowed() != null ? request.getRenewalAllowed() : true);
        plan.setIsActive(true);

        PolicyPlan saved = policyPlanRepository.save(plan);
        return PolicyPlanResponse.from(saved);
    }

    @Transactional
    public PolicyPlanResponse updatePlan(Long planId, PolicyPlanRequest request, Long adminId) {
        PolicyPlan plan = policyPlanRepository.findByIdWithPolicy(planId)
                .orElseThrow(() -> new RuntimeException("Policy plan not found with id: " + planId));
        validateOwnership(plan.getPolicy(), adminId);

        if (request.getPlanName() != null) plan.setPlanName(request.getPlanName());
        if (request.getCoverageAmount() != null) plan.setCoverageAmount(request.getCoverageAmount());
        if (request.getPremiumAmount() != null) plan.setPremiumAmount(request.getPremiumAmount());
        if (request.getPremiumBasis() != null) plan.setPremiumBasis(PremiumBasis.valueOf(request.getPremiumBasis()));
        if (request.getTenureOptions() != null) plan.setTenureOptions(request.getTenureOptions());
        if (request.getMaxMembers() != null) plan.setMaxMembers(request.getMaxMembers());
        if (request.getRoomRentLimit() != null) plan.setRoomRentLimit(request.getRoomRentLimit());
        if (request.getRenewalAllowed() != null) plan.setRenewalAllowed(request.getRenewalAllowed());

        PolicyPlan saved = policyPlanRepository.save(plan);
        return PolicyPlanResponse.from(saved);
    }

    public List<PolicyPlanResponse> getPlansByPolicy(Long policyId) {
        return policyPlanRepository.findByPolicyIdAndIsActiveTrue(policyId).stream()
                .map(PolicyPlanResponse::from)
                .collect(Collectors.toList());
    }

    public PolicyPlanResponse getPlanById(Long planId) {
        PolicyPlan plan = policyPlanRepository.findByIdWithPolicy(planId)
                .orElseThrow(() -> new RuntimeException("Policy plan not found with id: " + planId));
        return PolicyPlanResponse.from(plan);
    }

    @Transactional
    public void deactivatePlan(Long planId, Long adminId) {
        PolicyPlan plan = policyPlanRepository.findByIdWithPolicy(planId)
                .orElseThrow(() -> new RuntimeException("Policy plan not found with id: " + planId));
        validateOwnership(plan.getPolicy(), adminId);
        plan.setIsActive(false);
        policyPlanRepository.save(plan);
        // Cancel all active/pending enrollments under this plan
        List<PolicyEnrollment> affected = enrollmentRepository.findByPolicyPlan_IdAndStatusIn(
                planId, List.of(EnrollmentStatus.ACTIVE, EnrollmentStatus.PENDING));
        for (PolicyEnrollment e : affected) {
            e.setStatus(EnrollmentStatus.CANCELLED);
        }
        enrollmentRepository.saveAll(affected);
    }

    private void validateOwnership(Policy policy, Long adminId) {
        if (!policy.getCreatedBy().getId().equals(adminId)) {
            throw new RuntimeException("You can only manage plans for policies you created");
        }
    }
}
