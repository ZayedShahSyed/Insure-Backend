package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.EnrollmentRequest;
import com.cognizant.insurance.dto.EnrollmentResponse;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.service.PolicyEnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
public class PolicyEnrollmentController {

    private final PolicyEnrollmentService enrollmentService;

    public PolicyEnrollmentController(PolicyEnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<EnrollmentResponse> enroll(@RequestBody EnrollmentRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long customerId = userDetails.getUser().getId();
        return ResponseEntity.ok(enrollmentService.enroll(customerId, request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<EnrollmentResponse>> getMyEnrollments() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long customerId = userDetails.getUser().getId();
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByCustomer(customerId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EnrollmentResponse> getEnrollmentById(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentById(id));
    }

    @GetMapping("/policy/{policyId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<EnrollmentResponse>> getEnrollmentsByPolicy(@PathVariable Long policyId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByPolicy(policyId));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<EnrollmentResponse> approveEnrollment(@PathVariable Long id) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long adminId = userDetails.getUser().getId();
        return ResponseEntity.ok(enrollmentService.approveEnrollment(id, adminId));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<EnrollmentResponse> cancelEnrollment(@PathVariable Long id) {
        return ResponseEntity.ok(enrollmentService.cancelEnrollment(id));
    }
}

