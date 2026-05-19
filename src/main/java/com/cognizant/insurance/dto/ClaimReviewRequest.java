package com.cognizant.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimReviewRequest {
    private String status; // UNDER_REVIEW, APPROVED, REJECTED
    private BigDecimal approvedAmount; // required if APPROVED
    private String adminRemarks; // required if REJECTED
}

