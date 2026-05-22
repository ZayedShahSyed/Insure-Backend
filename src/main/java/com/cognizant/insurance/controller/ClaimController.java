package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.ClaimRequest;
import com.cognizant.insurance.dto.ClaimResponse;
import com.cognizant.insurance.dto.ClaimReviewRequest;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.service.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {

    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    // Customer submits a claim
    @PostMapping
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ClaimResponse> submitClaim(@RequestBody ClaimRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long customerId = userDetails.getUser().getId();
        return ResponseEntity.ok(claimService.submitClaim(customerId, request));
    }

    // Customer views their own claims
    @GetMapping("/my")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<List<ClaimResponse>> getMyClaims() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long customerId = userDetails.getUser().getId();
        return ResponseEntity.ok(claimService.getClaimsByCustomer(customerId));
    }

    // View single claim detail (authenticated user)
    @GetMapping("/{id}")
    public ResponseEntity<ClaimResponse> getClaimById(@PathVariable Long id) {
        return ResponseEntity.ok(claimService.getClaimById(id));
    }

    // Admin: get all claims (only for policies created by this admin)
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClaimResponse>> getAllClaims() {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long adminId = userDetails.getUser().getId();
        return ResponseEntity.ok(claimService.getClaimsByPolicyCreator(adminId));
    }

    // Admin: filter claims by status (only for policies created by this admin)
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ClaimResponse>> getClaimsByStatus(@PathVariable String status) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long adminId = userDetails.getUser().getId();
        return ResponseEntity.ok(claimService.getClaimsByStatusAndCreator(status, adminId));
    }

    // Admin: review/approve/reject a claim
    @PutMapping("/{id}/review")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ClaimResponse> reviewClaim(@PathVariable Long id,
                                                      @RequestBody ClaimReviewRequest request) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Long adminId = userDetails.getUser().getId();
        return ResponseEntity.ok(claimService.reviewClaim(id, adminId, request));
    }
}

