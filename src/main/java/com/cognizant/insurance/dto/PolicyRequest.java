package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.enums.PolicyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolicyRequest {
    private String name;
    private PolicyType policyType;
    private String description;
    private Long categoryId;
    private Map<String, Object> benefits;
    private Map<String, Object> exclusions;
    private Map<String, Object> documents;
    private Integer minAge;
    private Integer maxAge;
    private Integer waitingPeriodDays;
}
