package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.Claim;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ClaimResponse {
    private Long id;
    private String claimNumber;
    private String claimType;
    private LocalDate incidentDate;
    private String hospitalName;
    private String diagnosis;
    private String description;
    private BigDecimal claimedAmount;
    private BigDecimal approvedAmount;
    private String status;
    private String adminRemarks;
    private LocalDateTime reviewedAt;
    private String reviewedBy;
    private Map<String, Object> documents;

    // Policy/enrollment info
    private Long enrollmentId;
    private String enrollmentNumber;
    private String policyName;
    private String planName;

    // Customer info
    private Long customerId;
    private String customerName;
    private String customerEmail;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static ClaimResponse from(Claim claim) {
        ClaimResponse response = new ClaimResponse();
        response.setId(claim.getId());
        response.setClaimNumber(claim.getClaimNumber());
        response.setClaimType(claim.getClaimType() != null ? claim.getClaimType().name() : null);
        response.setIncidentDate(claim.getIncidentDate());
        response.setHospitalName(claim.getHospitalName());
        response.setDiagnosis(claim.getDiagnosis());
        response.setDescription(claim.getDescription());
        response.setClaimedAmount(claim.getClaimedAmount());
        response.setApprovedAmount(claim.getApprovedAmount());
        response.setStatus(claim.getStatus().name());
        response.setAdminRemarks(claim.getAdminRemarks());
        response.setReviewedAt(claim.getReviewedAt());
        response.setReviewedBy(claim.getReviewedBy() != null ? claim.getReviewedBy().getFullName() : null);
        response.setDocuments(claim.getDocuments());

        // Enrollment & policy info
        if (claim.getEnrollment() != null) {
            response.setEnrollmentId(claim.getEnrollment().getId());
            response.setEnrollmentNumber(claim.getEnrollment().getEnrollmentNumber());
            if (claim.getEnrollment().getPolicyPlan() != null) {
                response.setPlanName(claim.getEnrollment().getPolicyPlan().getPlanName());
                if (claim.getEnrollment().getPolicyPlan().getPolicy() != null) {
                    response.setPolicyName(claim.getEnrollment().getPolicyPlan().getPolicy().getName());
                }
            }
        }

        // Customer info
        if (claim.getCustomer() != null) {
            response.setCustomerId(claim.getCustomer().getId());
            response.setCustomerName(claim.getCustomer().getFullName());
            response.setCustomerEmail(claim.getCustomer().getEmail());
        }

        response.setCreatedAt(claim.getCreatedAt());
        response.setUpdatedAt(claim.getUpdatedAt());
        return response;
    }
}

