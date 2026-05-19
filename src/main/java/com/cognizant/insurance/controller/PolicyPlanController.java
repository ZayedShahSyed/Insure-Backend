package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.PolicyPlanRequest;
import com.cognizant.insurance.dto.PolicyPlanResponse;
import com.cognizant.insurance.service.PolicyPlanService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policy-plans")
public class PolicyPlanController {

    private final PolicyPlanService policyPlanService;

    public PolicyPlanController(PolicyPlanService policyPlanService) {
        this.policyPlanService = policyPlanService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyPlanResponse> createPlan(@RequestParam Long policyId,
                                                         @RequestBody PolicyPlanRequest request) {
        return ResponseEntity.ok(policyPlanService.createPlan(policyId, request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyPlanResponse> updatePlan(@PathVariable Long id,
                                                         @RequestBody PolicyPlanRequest request) {
        return ResponseEntity.ok(policyPlanService.updatePlan(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivatePlan(@PathVariable Long id) {
        policyPlanService.deactivatePlan(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/policy/{policyId}")
    public ResponseEntity<List<PolicyPlanResponse>> getPlansByPolicy(@PathVariable Long policyId) {
        return ResponseEntity.ok(policyPlanService.getPlansByPolicy(policyId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolicyPlanResponse> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(policyPlanService.getPlanById(id));
    }
}

