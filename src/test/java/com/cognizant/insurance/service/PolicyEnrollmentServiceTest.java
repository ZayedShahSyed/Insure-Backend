package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.EnrollmentRequest;
import com.cognizant.insurance.dto.EnrollmentResponse;
import com.cognizant.insurance.entity.*;
import com.cognizant.insurance.entity.enums.*;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.PolicyPlanRepository;
import com.cognizant.insurance.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PolicyEnrollmentServiceTest {

    @Mock
    private PolicyEnrollmentRepository enrollmentRepository;

    @Mock
    private PolicyPlanRepository policyPlanRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PolicyEnrollmentService enrollmentService;

    private User customer;
    private User admin;
    private PolicyPlan plan;
    private Policy policy;
    private PolicyEnrollment enrollment;

    @BeforeEach
    void setUp() {
        admin = new User();
        admin.setId(1L);
        admin.setRole(Role.ADMIN);

        customer = new User();
        customer.setId(2L);
        customer.setRole(Role.CUSTOMER);

        policy = new Policy();
        policy.setId(1L);
        policy.setCreatedBy(admin);

        plan = new PolicyPlan();
        plan.setId(1L);
        plan.setPolicy(policy);
        plan.setPremiumAmount(new BigDecimal("10000"));
        plan.setTenureOptions(List.of(1, 2, 3));
        plan.setMaxMembers(4);
        plan.setIsActive(true);

        enrollment = new PolicyEnrollment();
        enrollment.setId(1L);
        enrollment.setEnrollmentNumber("ENR-ABCD1234");
        enrollment.setCustomer(customer);
        enrollment.setPolicyPlan(plan);
        enrollment.setStatus(EnrollmentStatus.PENDING);
        enrollment.setPremiumAmount(new BigDecimal("10000"));
        enrollment.setTenureYears(1);
    }

    @Test
    void enroll_success() {
        EnrollmentRequest request = new EnrollmentRequest();
        request.setPolicyPlanId(1L);
        request.setTenureYears(2);
        request.setMembers(null);

        when(policyPlanRepository.findByIdWithPolicy(1L)).thenReturn(Optional.of(plan));
        when(userRepository.findById(2L)).thenReturn(Optional.of(customer));
        when(enrollmentRepository.save(any(PolicyEnrollment.class))).thenAnswer(invocation -> {
            PolicyEnrollment e = invocation.getArgument(0);
            e.setId(10L);
            return e;
        });

        EnrollmentResponse result = enrollmentService.enroll(2L, request);

        assertNotNull(result);
        verify(enrollmentRepository).save(any(PolicyEnrollment.class));
    }

    @Test
    void enroll_invalidTenure_throwsException() {
        EnrollmentRequest request = new EnrollmentRequest();
        request.setPolicyPlanId(1L);
        request.setTenureYears(5); // not in [1,2,3]

        when(policyPlanRepository.findByIdWithPolicy(1L)).thenReturn(Optional.of(plan));

        assertThrows(RuntimeException.class,
                () -> enrollmentService.enroll(2L, request));
    }

    @Test
    void enroll_planNotFound_throwsException() {
        EnrollmentRequest request = new EnrollmentRequest();
        request.setPolicyPlanId(999L);
        request.setTenureYears(1);

        when(policyPlanRepository.findByIdWithPolicy(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> enrollmentService.enroll(2L, request));
    }

    @Test
    void approveEnrollment_success() {
        enrollment.setPolicyPlan(plan);
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));
        when(userRepository.findById(1L)).thenReturn(Optional.of(admin));
        when(enrollmentRepository.save(any(PolicyEnrollment.class))).thenAnswer(i -> i.getArgument(0));

        EnrollmentResponse result = enrollmentService.approveEnrollment(1L, 1L);

        assertNotNull(result);
        assertEquals(EnrollmentStatus.ACTIVE, enrollment.getStatus());
        assertEquals(PaymentStatus.PAID, enrollment.getPaymentStatus());
        assertNotNull(enrollment.getApprovedAt());
    }

    @Test
    void approveEnrollment_notPending_throwsException() {
        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        assertThrows(RuntimeException.class,
                () -> enrollmentService.approveEnrollment(1L, 1L));
    }

    @Test
    void approveEnrollment_wrongAdmin_throwsException() {
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        // adminId=999 doesn't match policy.createdBy (id=1)
        assertThrows(RuntimeException.class,
                () -> enrollmentService.approveEnrollment(1L, 999L));
    }

    @Test
    void cancelEnrollment_byCustomer_success() {
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));
        when(enrollmentRepository.save(any(PolicyEnrollment.class))).thenAnswer(i -> i.getArgument(0));

        EnrollmentResponse result = enrollmentService.cancelEnrollment(1L, 2L); // customer id=2

        assertNotNull(result);
        assertEquals(EnrollmentStatus.CANCELLED, enrollment.getStatus());
    }

    @Test
    void cancelEnrollment_byPolicyAdmin_success() {
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));
        when(enrollmentRepository.save(any(PolicyEnrollment.class))).thenAnswer(i -> i.getArgument(0));

        EnrollmentResponse result = enrollmentService.cancelEnrollment(1L, 1L); // admin id=1

        assertEquals(EnrollmentStatus.CANCELLED, enrollment.getStatus());
    }

    @Test
    void cancelEnrollment_unauthorizedUser_throwsException() {
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        assertThrows(RuntimeException.class,
                () -> enrollmentService.cancelEnrollment(1L, 999L));
    }

    @Test
    void cancelEnrollment_alreadyCancelled_throwsException() {
        enrollment.setStatus(EnrollmentStatus.CANCELLED);
        enrollment.setCustomer(customer);
        when(enrollmentRepository.findByIdWithDetails(1L)).thenReturn(Optional.of(enrollment));

        assertThrows(RuntimeException.class,
                () -> enrollmentService.cancelEnrollment(1L, 2L));
    }
}

