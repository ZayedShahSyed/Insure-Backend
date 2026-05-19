package com.cognizant.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PolicyPlanRequest {
    private String planName;
    private BigDecimal coverageAmount;
    private BigDecimal premiumAmount;
    private String premiumBasis;
    private List<Integer> tenureOptions;
    private Integer maxMembers;
    private BigDecimal roomRentLimit;
    private Boolean renewalAllowed;
}

