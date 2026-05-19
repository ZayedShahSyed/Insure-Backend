package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.PolicyRequest;
import com.cognizant.insurance.dto.PolicyResponse;
import com.cognizant.insurance.entity.Policy;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.service.PolicyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
public class PolicyController {
    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> createPolicy(@RequestBody PolicyRequest request,
                                                       @AuthenticationPrincipal CustomUserDetails userDetails) {
        Policy policy = policyService.createPolicy(request, userDetails.getUser());
        return ResponseEntity.status(HttpStatus.CREATED).body(PolicyResponse.from(policy));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolicyResponse> getPolicyById(@PathVariable Long id) {
        Policy policy = policyService.getPolicyById(id);
        return ResponseEntity.ok(PolicyResponse.from(policy));
    }

    @GetMapping
    public ResponseEntity<List<PolicyResponse>> getAllActivePolicies() {
        List<PolicyResponse> policies = policyService.getActivePolicies()
                .stream()
                .map(PolicyResponse::from)
                .toList();
        return ResponseEntity.ok(policies);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> updatePolicy(@PathVariable Long id,
                                                       @RequestBody PolicyRequest request) {
        Policy policy = policyService.updatePolicy(id, request);
        return ResponseEntity.ok(PolicyResponse.from(policy));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> deletePolicy(@PathVariable Long id) {
        Policy policy = policyService.deletePolicy(id);
        return ResponseEntity.ok(PolicyResponse.from(policy));
    }

    @PatchMapping("/{id}/reactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyResponse> reactivatePolicy(@PathVariable Long id) {
        Policy policy = policyService.reactivatePolicy(id);
        return ResponseEntity.ok(PolicyResponse.from(policy));
    }
}
