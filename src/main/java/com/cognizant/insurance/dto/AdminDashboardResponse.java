package com.cognizant.insurance.dto;

import lombok.Data;

@Data
public class AdminDashboardResponse {
    private long totalPolicies;
    private long activePolicies;
    private long totalCustomers;
    private long totalEnrollments;
    private long activeEnrollments;
    private long pendingEnrollments;
    private long totalClaims;
    private long pendingClaims;
    private long underReviewClaims;
    private long approvedClaimsThisMonth;
    private long rejectedClaimsThisMonth;
}

