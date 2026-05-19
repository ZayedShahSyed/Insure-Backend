package com.cognizant.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentRequest {
    private Long policyPlanId;
    private Integer tenureYears;
    private List<EnrollmentPersonRequest> members;
}

