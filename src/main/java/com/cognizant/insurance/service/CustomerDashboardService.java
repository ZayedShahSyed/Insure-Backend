package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.*;
import com.cognizant.insurance.entity.Claim;
import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.ClaimStatus;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.repository.ClaimRepository;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerDashboardService {

    private final PolicyEnrollmentRepository enrollmentRepository;
    private final ClaimRepository claimRepository;
    private final UserRepository userRepository;

    public CustomerDashboardService(PolicyEnrollmentRepository enrollmentRepository,
                                    ClaimRepository claimRepository,
                                    UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.claimRepository = claimRepository;
        this.userRepository = userRepository;
    }

    public CustomerDashboardResponse getDashboard(Long customerId) {
        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<PolicyEnrollment> enrollments = enrollmentRepository.findByCustomerId(customerId);
        List<Claim> claims = claimRepository.findByCustomerIdWithDetails(customerId);

        CustomerDashboardResponse dashboard = new CustomerDashboardResponse();
        dashboard.setCustomerName(customer.getFullName());
        dashboard.setEmail(customer.getEmail());

        // Enrollment stats
        dashboard.setTotalEnrollments(enrollments.size());
        dashboard.setActiveEnrollments((int) enrollments.stream()
                .filter(e -> e.getStatus() == EnrollmentStatus.ACTIVE).count());
        dashboard.setPendingEnrollments((int) enrollments.stream()
                .filter(e -> e.getStatus() == EnrollmentStatus.PENDING).count());

        // Claim stats
        dashboard.setTotalClaims(claims.size());
        dashboard.setPendingClaims((int) claims.stream()
                .filter(c -> c.getStatus() == ClaimStatus.PENDING || c.getStatus() == ClaimStatus.UNDER_REVIEW).count());
        dashboard.setApprovedClaims((int) claims.stream()
                .filter(c -> c.getStatus() == ClaimStatus.APPROVED).count());
        dashboard.setRejectedClaims((int) claims.stream()
                .filter(c -> c.getStatus() == ClaimStatus.REJECTED).count());

        // Active policies
        dashboard.setActivePolices(enrollments.stream()
                .filter(e -> e.getStatus() == EnrollmentStatus.ACTIVE)
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList()));

        // Recent enrollments (last 5)
        dashboard.setRecentEnrollments(enrollments.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(5)
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList()));

        // Recent claims (last 5)
        dashboard.setRecentClaims(claims.stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .limit(5)
                .map(ClaimResponse::from)
                .collect(Collectors.toList()));

        return dashboard;
    }
}

