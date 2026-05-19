package com.cognizant.insurance.dto;

import lombok.Data;

import java.util.List;

@Data
public class CustomerDashboardResponse {
    private String customerName;
    private String email;
    private int totalEnrollments;
    private int activeEnrollments;
    private int pendingEnrollments;
    private int totalClaims;
    private int pendingClaims;
    private int approvedClaims;
    private int rejectedClaims;
    private List<EnrollmentResponse> activePolices;
    private List<EnrollmentResponse> recentEnrollments;
    private List<ClaimResponse> recentClaims;
}

