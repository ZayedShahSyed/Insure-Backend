package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.PolicyEnrollment;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class EnrollmentResponse {
    private Long id;
    private String enrollmentNumber;
    private String policyName;
    private String planName;
    private BigDecimal premiumAmount;
    private Integer tenureYears;
    private LocalDate startDate;
    private LocalDate endDate;
    private String paymentStatus;
    private String status;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private BigDecimal coverageAmount;
    private String policyType;
    private LocalDateTime approvedAt;
    private String approvedBy;
    private List<EnrollmentPersonResponse> members;
    private LocalDateTime createdAt;

    public static EnrollmentResponse from(PolicyEnrollment enrollment) {
        EnrollmentResponse response = new EnrollmentResponse();
        response.setId(enrollment.getId());
        response.setEnrollmentNumber(enrollment.getEnrollmentNumber());
        response.setPolicyName(enrollment.getPolicyPlan().getPolicy().getName());
        response.setPlanName(enrollment.getPolicyPlan().getPlanName());
        response.setPremiumAmount(enrollment.getPremiumAmount());
        response.setTenureYears(enrollment.getTenureYears());
        response.setStartDate(enrollment.getStartDate());
        response.setEndDate(enrollment.getEndDate());
        response.setPaymentStatus(enrollment.getPaymentStatus().name());
        response.setStatus(enrollment.getStatus().name());
        response.setCustomerName(enrollment.getCustomer().getFullName());
        response.setCustomerEmail(enrollment.getCustomer().getEmail());
        response.setCustomerPhone(enrollment.getCustomer().getPhone());
        response.setCoverageAmount(enrollment.getPolicyPlan().getCoverageAmount());
        response.setPolicyType(enrollment.getPolicyPlan().getPolicy().getPolicyType() != null ? enrollment.getPolicyPlan().getPolicy().getPolicyType().name() : null);
        response.setApprovedAt(enrollment.getApprovedAt());
        response.setApprovedBy(enrollment.getApprovedBy() != null ? enrollment.getApprovedBy().getFullName() : null);
        if (enrollment.getEnrollmentPeople() != null) {
            response.setMembers(enrollment.getEnrollmentPeople().stream()
                    .map(EnrollmentPersonResponse::from)
                    .collect(Collectors.toList()));
        }
        response.setCreatedAt(enrollment.getCreatedAt());
        return response;
    }
}

