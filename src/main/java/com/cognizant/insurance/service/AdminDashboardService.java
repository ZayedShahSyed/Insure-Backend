package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.AdminDashboardResponse;
import com.cognizant.insurance.entity.enums.ClaimStatus;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;

@Service
public class AdminDashboardService {

    private final PolicyRepository policyRepository;
    private final UserRepository userRepository;
    private final PolicyEnrollmentRepository enrollmentRepository;
    private final ClaimRepository claimRepository;

    public AdminDashboardService(PolicyRepository policyRepository,
                                 UserRepository userRepository,
                                 PolicyEnrollmentRepository enrollmentRepository,
                                 ClaimRepository claimRepository) {
        this.policyRepository = policyRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.claimRepository = claimRepository;
    }

    public AdminDashboardResponse getDashboard() {
        AdminDashboardResponse dashboard = new AdminDashboardResponse();

        dashboard.setTotalPolicies(policyRepository.count());
        dashboard.setActivePolicies(policyRepository.countByIsActiveTrue());
        dashboard.setTotalCustomers(userRepository.countByRole(Role.CUSTOMER));
        dashboard.setTotalEnrollments(enrollmentRepository.count());
        dashboard.setActiveEnrollments(enrollmentRepository.countByStatus(EnrollmentStatus.ACTIVE));
        dashboard.setPendingEnrollments(enrollmentRepository.countByStatus(EnrollmentStatus.PENDING));
        dashboard.setTotalClaims(claimRepository.count());
        dashboard.setPendingClaims(claimRepository.countByStatus(ClaimStatus.PENDING));
        dashboard.setUnderReviewClaims(claimRepository.countByStatus(ClaimStatus.UNDER_REVIEW));

        LocalDateTime startOfMonth = LocalDateTime.now()
                .with(TemporalAdjusters.firstDayOfMonth())
                .withHour(0).withMinute(0).withSecond(0).withNano(0);
        dashboard.setApprovedClaimsThisMonth(claimRepository.countByStatusAndReviewedAtAfter(ClaimStatus.APPROVED, startOfMonth));
        dashboard.setRejectedClaimsThisMonth(claimRepository.countByStatusAndReviewedAtAfter(ClaimStatus.REJECTED, startOfMonth));

        return dashboard;
    }
}

