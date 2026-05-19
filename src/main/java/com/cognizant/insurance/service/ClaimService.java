package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.ClaimRequest;
import com.cognizant.insurance.dto.ClaimResponse;
import com.cognizant.insurance.dto.ClaimReviewRequest;
import com.cognizant.insurance.entity.Claim;
import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.ClaimStatus;
import com.cognizant.insurance.entity.enums.ClaimType;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.repository.ClaimRepository;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClaimService {

    private final ClaimRepository claimRepository;
    private final PolicyEnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;

    public ClaimService(ClaimRepository claimRepository,
                        PolicyEnrollmentRepository enrollmentRepository,
                        UserRepository userRepository) {
        this.claimRepository = claimRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ClaimResponse submitClaim(Long customerId, ClaimRequest request) {
        PolicyEnrollment enrollment = enrollmentRepository.findByIdWithDetails(request.getEnrollmentId())
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + request.getEnrollmentId()));

        // Validate enrollment belongs to customer
        if (!enrollment.getCustomer().getId().equals(customerId)) {
            throw new RuntimeException("Enrollment does not belong to the current customer");
        }

        // Validate enrollment is active
        if (enrollment.getStatus() != EnrollmentStatus.ACTIVE) {
            throw new RuntimeException("Claims can only be filed against ACTIVE enrollments");
        }

        // Validate claimed amount doesn't exceed coverage
        if (request.getClaimedAmount() != null && enrollment.getPolicyPlan().getCoverageAmount() != null
                && request.getClaimedAmount().compareTo(enrollment.getPolicyPlan().getCoverageAmount()) > 0) {
            throw new RuntimeException("Claimed amount exceeds policy coverage amount of " + enrollment.getPolicyPlan().getCoverageAmount());
        }

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Generate claim number
        String claimNumber = "CLM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Claim claim = new Claim();
        claim.setClaimNumber(claimNumber);
        claim.setCustomer(customer);
        claim.setEnrollment(enrollment);
        claim.setIncidentDate(request.getIncidentDate());
        claim.setHospitalName(request.getHospitalName());
        claim.setDiagnosis(request.getDiagnosis());
        claim.setDescription(request.getDescription());
        claim.setClaimedAmount(request.getClaimedAmount());
        claim.setStatus(ClaimStatus.PENDING);
        if (request.getClaimType() != null) {
            claim.setClaimType(ClaimType.valueOf(request.getClaimType()));
        }
        if (request.getDocuments() != null) {
            claim.setDocuments(request.getDocuments());
        }

        Claim saved = claimRepository.save(claim);
        return ClaimResponse.from(saved);
    }

    public List<ClaimResponse> getClaimsByCustomer(Long customerId) {
        return claimRepository.findByCustomerIdWithDetails(customerId).stream()
                .map(ClaimResponse::from)
                .collect(Collectors.toList());
    }

    public ClaimResponse getClaimById(Long claimId) {
        Claim claim = claimRepository.findByIdWithDetails(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found with id: " + claimId));
        return ClaimResponse.from(claim);
    }

    public List<ClaimResponse> getAllClaims() {
        return claimRepository.findAll().stream()
                .map(ClaimResponse::from)
                .collect(Collectors.toList());
    }

    public List<ClaimResponse> getClaimsByStatus(String status) {
        ClaimStatus claimStatus = ClaimStatus.valueOf(status);
        return claimRepository.findByStatus(claimStatus).stream()
                .map(ClaimResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ClaimResponse reviewClaim(Long claimId, Long adminId, ClaimReviewRequest request) {
        Claim claim = claimRepository.findByIdWithDetails(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found with id: " + claimId));

        ClaimStatus newStatus = ClaimStatus.valueOf(request.getStatus());

        // Validate status transitions
        validateStatusTransition(claim.getStatus(), newStatus);

        // Validate approved amount for APPROVED status
        if (newStatus == ClaimStatus.APPROVED) {
            if (request.getApprovedAmount() == null) {
                throw new RuntimeException("Approved amount is required when approving a claim");
            }
            claim.setApprovedAmount(request.getApprovedAmount());
        }

        // Validate rejection reason for REJECTED status
        if (newStatus == ClaimStatus.REJECTED) {
            if (request.getAdminRemarks() == null || request.getAdminRemarks().isBlank()) {
                throw new RuntimeException("Admin remarks/rejection reason is mandatory when rejecting a claim");
            }
        }

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin user not found"));

        claim.setStatus(newStatus);
        claim.setReviewedBy(admin);
        claim.setReviewedAt(LocalDateTime.now());
        if (request.getAdminRemarks() != null) {
            claim.setAdminRemarks(request.getAdminRemarks());
        }

        Claim saved = claimRepository.save(claim);
        return ClaimResponse.from(saved);
    }

    private void validateStatusTransition(ClaimStatus current, ClaimStatus next) {
        switch (current) {
            case PENDING:
                if (next != ClaimStatus.UNDER_REVIEW && next != ClaimStatus.REJECTED) {
                    throw new RuntimeException("PENDING claims can only move to UNDER_REVIEW or REJECTED");
                }
                break;
            case UNDER_REVIEW:
                if (next != ClaimStatus.APPROVED && next != ClaimStatus.REJECTED) {
                    throw new RuntimeException("UNDER_REVIEW claims can only move to APPROVED or REJECTED");
                }
                break;
            case APPROVED:
            case REJECTED:
                throw new RuntimeException("Cannot change status of a claim that is already " + current);
            default:
                throw new RuntimeException("Invalid claim status: " + current);
        }
    }
}

