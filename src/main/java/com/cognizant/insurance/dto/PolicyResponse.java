package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.Policy;
import com.cognizant.insurance.entity.enums.PolicyType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class PolicyResponse {
    private Long id;
    private String policyCode;
    private String name;
    private PolicyType policyType;
    private String description;
    private Long categoryId;
    private String categoryName;
    private Map<String, Object> benefits;
    private Map<String, Object> exclusions;
    private Map<String, Object> documents;
    private Integer minAge;
    private Integer maxAge;
    private Integer waitingPeriodDays;
    private Boolean isActive;
    private Long createdById;
    private String createdByName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static PolicyResponse from(Policy policy) {
        PolicyResponse response = new PolicyResponse();
        response.setId(policy.getId());
        response.setPolicyCode(policy.getPolicyCode());
        response.setName(policy.getName());
        response.setPolicyType(policy.getPolicyType());
        response.setDescription(policy.getDescription());
        response.setCategoryId(policy.getCategory().getId());
        response.setCategoryName(policy.getCategory().getName());
        response.setBenefits(policy.getBenefits());
        response.setExclusions(policy.getExclusions());
        response.setDocuments(policy.getDocuments());
        response.setMinAge(policy.getMinAge());
        response.setMaxAge(policy.getMaxAge());
        response.setWaitingPeriodDays(policy.getWaitingPeriodDays());
        response.setIsActive(policy.getIsActive());
        response.setCreatedById(policy.getCreatedBy().getId());
        response.setCreatedByName(policy.getCreatedBy().getFullName());
        response.setCreatedAt(policy.getCreatedAt());
        response.setUpdatedAt(policy.getUpdatedAt());
        return response;
    }
}

