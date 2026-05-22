package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.PolicyPlan;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PolicyPlanResponse {
    private Long id;
    private String planName;
    private BigDecimal coverageAmount;
    private BigDecimal premiumAmount;
    private String premiumBasis;
    private List<Integer> tenureOptions;
    private Integer maxMembers;
    private Boolean renewalAllowed;
    private Long policyId;
    private String policyName;
    private String policyType;

    public static PolicyPlanResponse from(PolicyPlan plan) {
        PolicyPlanResponse response = new PolicyPlanResponse();
        response.setId(plan.getId());
        response.setPlanName(plan.getPlanName());
        response.setCoverageAmount(plan.getCoverageAmount());
        response.setPremiumAmount(plan.getPremiumAmount());
        response.setPremiumBasis(plan.getPremiumBasis() != null ? plan.getPremiumBasis().name() : null);
        response.setTenureOptions(plan.getTenureOptions());
        response.setMaxMembers(plan.getMaxMembers());
        response.setRenewalAllowed(plan.getRenewalAllowed());
        response.setPolicyId(plan.getPolicy().getId());
        response.setPolicyName(plan.getPolicy().getName());
        response.setPolicyType(plan.getPolicy().getPolicyType() != null ? plan.getPolicy().getPolicyType().name() : null);
        return response;
    }
}

