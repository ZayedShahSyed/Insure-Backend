package com.cognizant.insurance.service;

import java.util.List;
import java.util.UUID;

import com.cognizant.insurance.dto.PolicyRequest;
import com.cognizant.insurance.entity.Policy;
import com.cognizant.insurance.entity.PolicyCategory;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.repository.PolicyCategoryRepository;
import com.cognizant.insurance.repository.PolicyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PolicyService {
    private final PolicyRepository policyRepository;
    private final PolicyCategoryRepository policyCategoryRepository;

    public PolicyService(PolicyRepository policyRepository, PolicyCategoryRepository policyCategoryRepository) {
        this.policyRepository = policyRepository;
        this.policyCategoryRepository = policyCategoryRepository;
    }

    @Transactional
    public Policy createPolicy(PolicyRequest request, User createdBy) {
        if (policyRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Policy with this name already exists");
        }

        PolicyCategory category = policyCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Policy category not found with id: " + request.getCategoryId()));

        Policy policy = new Policy();
        policy.setPolicyCode("POL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        policy.setName(request.getName());
        policy.setPolicyType(request.getPolicyType());
        policy.setDescription(request.getDescription());
        policy.setCategory(category);
        policy.setCreatedBy(createdBy);
        policy.setBenefits(request.getBenefits());
        policy.setExclusions(request.getExclusions());
        policy.setDocuments(request.getDocuments());
        policy.setMinAge(request.getMinAge());
        policy.setMaxAge(request.getMaxAge());
        policy.setWaitingPeriodDays(request.getWaitingPeriodDays());
        policy.setIsActive(true);

        return policyRepository.save(policy);
    }

    public Policy getPolicyById(Long id) {
        return policyRepository.findByIdWithRelations(id)
                .orElseThrow(() -> new IllegalArgumentException("Policy not found with id: " + id));
    }

    public List<Policy> getAllPolicies() {
        return policyRepository.findAll();
    }

    public List<Policy> getActivePolicies() {
        return policyRepository.findByIsActiveTrue();
    }

    public List<Policy> getPoliciesByCreator(Long adminId) {
        return policyRepository.findByCreatedById(adminId);
    }

    @Transactional
    public Policy updatePolicy(Long id, PolicyRequest request, Long adminId) {
        Policy existingPolicy = getPolicyById(id);
        validateOwnership(existingPolicy, adminId);
        if (request.getName() != null && !request.getName().equals(existingPolicy.getName())) {
            if (policyRepository.existsByName(request.getName())) {
                throw new IllegalArgumentException("Policy with this name already exists");
            }
            existingPolicy.setName(request.getName());
        }
        if (request.getDescription() != null) existingPolicy.setDescription(request.getDescription());
        if (request.getPolicyType() != null) existingPolicy.setPolicyType(request.getPolicyType());
        if (request.getCategoryId() != null) {
            PolicyCategory category = policyCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Policy category not found"));
            existingPolicy.setCategory(category);
        }
        if (request.getBenefits() != null) existingPolicy.setBenefits(request.getBenefits());
        if (request.getExclusions() != null) existingPolicy.setExclusions(request.getExclusions());
        if (request.getDocuments() != null) existingPolicy.setDocuments(request.getDocuments());
        if (request.getMinAge() != null) existingPolicy.setMinAge(request.getMinAge());
        if (request.getMaxAge() != null) existingPolicy.setMaxAge(request.getMaxAge());
        if (request.getWaitingPeriodDays() != null) existingPolicy.setWaitingPeriodDays(request.getWaitingPeriodDays());
        return policyRepository.save(existingPolicy);
    }

    @Transactional
    public Policy deletePolicy(Long id, Long adminId) {
        Policy policy = getPolicyById(id);
        validateOwnership(policy, adminId);
        policy.setIsActive(false);
        return policyRepository.save(policy);
    }

    @Transactional
    public Policy reactivatePolicy(Long id, Long adminId) {
        Policy policy = getPolicyById(id);
        validateOwnership(policy, adminId);
        policy.setIsActive(true);
        return policyRepository.save(policy);
    }

    private void validateOwnership(Policy policy, Long adminId) {
        if (!policy.getCreatedBy().getId().equals(adminId)) {
            throw new RuntimeException("You can only manage policies you created");
        }
    }
}
