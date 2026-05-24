package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.ClaimRequest;
import com.cognizant.insurance.dto.ClaimResponse;
import com.cognizant.insurance.dto.ClaimReviewRequest;
import com.cognizant.insurance.entity.*;
import com.cognizant.insurance.entity.enums.*;
import com.cognizant.insurance.repository.ClaimRepository;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClaimServiceTest {

    @Mock
    private ClaimRepository claimRepository;

    @Mock
    private PolicyEnrollmentRepository enrollmentRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ClaimService claimService;

    private User customer;
    private User admin;
    private PolicyEnrollment enrollment;
    private PolicyPlan plan;
    private Policy policy;
    private PolicyCategory category;

    @BeforeEach
    void setUp() {
        admin = new User();
        admin.setId(1L);
        admin.setRole(Role.ADMIN);

        customer = new User();
        customer.setId(2L);
        customer.setRole(Role.CUSTOMER);

        category = new PolicyCategory();
        category.setId(1L);
        category.setName("Health");

        policy = new Policy();
        policy.setId(1L);
        policy.setCategory(category);
        policy.setCreatedBy(admin);

        plan = new PolicyPlan();
        plan.setId(1L);
        plan.setPolicy(policy);
        plan.setCoverageAmount(new BigDecimal("500000"));

        enrollment = new PolicyEnrollment();
        enrollment.setId(1L);
        enrollment.setCustomer(customer);
        enrollment.setPolicyPlan(plan);
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
    }

    @Test
    void submitClaim_success() {
        ClaimRequest request = new ClaimRequest();
        request.setEnrollmentId(1L);
        request.setIncidentDate(LocalDate.now().minusDays(5));
        request.setHospitalName("City Hospital");
        request.setDiagnosis("Fever");
        request.setDescription("Admitted for treatment");
        request.setClaimedAmount(new BigDecimal("50000"));

        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));
        when(userRepository.findById(2L)).thenReturn(Optional.of(customer));
        when(claimRepository.save(any(Claim.class))).thenAnswer(invocation -> {
            Claim c = invocation.getArgument(0);
            c.setId(1L);
            return c;
        });

        ClaimResponse result = claimService.submitClaim(2L, request);

        assertNotNull(result);
        verify(claimRepository).save(any(Claim.class));
    }

    @Test
    void submitClaim_enrollmentNotBelongingToCustomer_throwsException() {
        ClaimRequest request = new ClaimRequest();
        request.setEnrollmentId(1L);

        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        // customerId=999 doesn't match enrollment's customer (id=2)
        assertThrows(RuntimeException.class,
                () -> claimService.submitClaim(999L, request));
    }

    @Test
    void submitClaim_enrollmentNotActive_throwsException() {
        enrollment.setStatus(EnrollmentStatus.PENDING);
        ClaimRequest request = new ClaimRequest();
        request.setEnrollmentId(1L);

        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        assertThrows(RuntimeException.class,
                () -> claimService.submitClaim(2L, request));
    }

    @Test
    void submitClaim_amountExceedsCoverage_throwsException() {
        ClaimRequest request = new ClaimRequest();
        request.setEnrollmentId(1L);
        request.setClaimedAmount(new BigDecimal("999999")); // exceeds 500000 coverage

        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        assertThrows(RuntimeException.class,
                () -> claimService.submitClaim(2L, request));
    }

    @Test
    void reviewClaim_approve_success() {
        Claim claim = new Claim();
        claim.setId(1L);
        claim.setStatus(ClaimStatus.UNDER_REVIEW);
        claim.setEnrollment(enrollment);
        claim.setCustomer(customer);

        ClaimReviewRequest request = new ClaimReviewRequest();
        request.setStatus("APPROVED");
        request.setApprovedAmount(new BigDecimal("40000"));
        request.setAdminRemarks("Claim looks valid");

        when(claimRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(claim));
        when(userRepository.findById(1L)).thenReturn(Optional.of(admin));
        when(claimRepository.save(any(Claim.class))).thenAnswer(i -> i.getArgument(0));

        ClaimResponse result = claimService.reviewClaim(1L, 1L, request);

        assertNotNull(result);
        assertEquals(ClaimStatus.APPROVED, claim.getStatus());
        assertEquals(new BigDecimal("40000"), claim.getApprovedAmount());
    }

    @Test
    void reviewClaim_rejectWithoutRemarks_throwsException() {
        Claim claim = new Claim();
        claim.setId(1L);
        claim.setStatus(ClaimStatus.PENDING);
        claim.setEnrollment(enrollment);

        ClaimReviewRequest request = new ClaimReviewRequest();
        request.setStatus("REJECTED");
        request.setAdminRemarks(null);

        when(claimRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(claim));

        assertThrows(RuntimeException.class,
                () -> claimService.reviewClaim(1L, 1L, request));
    }

    @Test
    void reviewClaim_approveWithoutAmount_throwsException() {
        Claim claim = new Claim();
        claim.setId(1L);
        claim.setStatus(ClaimStatus.UNDER_REVIEW);
        claim.setEnrollment(enrollment);

        ClaimReviewRequest request = new ClaimReviewRequest();
        request.setStatus("APPROVED");
        request.setApprovedAmount(null);

        when(claimRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(claim));

        assertThrows(RuntimeException.class,
                () -> claimService.reviewClaim(1L, 1L, request));
    }

    @Test
    void reviewClaim_invalidStatusTransition_throwsException() {
        Claim claim = new Claim();
        claim.setId(1L);
        claim.setStatus(ClaimStatus.APPROVED); // already terminal
        claim.setEnrollment(enrollment);

        ClaimReviewRequest request = new ClaimReviewRequest();
        request.setStatus("REJECTED");

        when(claimRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(claim));

        assertThrows(RuntimeException.class,
                () -> claimService.reviewClaim(1L, 1L, request));
    }

    @Test
    void reviewClaim_wrongAdmin_throwsException() {
        Claim claim = new Claim();
        claim.setId(1L);
        claim.setStatus(ClaimStatus.PENDING);
        claim.setEnrollment(enrollment);

        ClaimReviewRequest request = new ClaimReviewRequest();
        request.setStatus("UNDER_REVIEW");

        when(claimRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(claim));

        // adminId=999 doesn't match policy.createdBy (id=1)
        assertThrows(RuntimeException.class,
                () -> claimService.reviewClaim(1L, 999L, request));
    }
}

