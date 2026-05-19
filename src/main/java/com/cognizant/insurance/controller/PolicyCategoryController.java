package com.cognizant.insurance.controller;


import com.cognizant.insurance.dto.PolicyCategoryRequest;
import com.cognizant.insurance.dto.PolicyCategoryResponse;
import com.cognizant.insurance.entity.PolicyCategory;
import com.cognizant.insurance.service.PolicyCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/policy-categories")
public class PolicyCategoryController {
    private final PolicyCategoryService policyCategoryService;

    public PolicyCategoryController(PolicyCategoryService policyCategoryService) {
        this.policyCategoryService = policyCategoryService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyCategoryResponse> createPolicyCategory(@RequestBody PolicyCategoryRequest request) {
        PolicyCategory category = policyCategoryService.createPolicyCategory(request.getName(), request.getDescription());
        return ResponseEntity.status(HttpStatus.CREATED).body(PolicyCategoryResponse.from(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PolicyCategoryResponse> getPolicyCategoryById(@PathVariable Long id) {
        PolicyCategory category = policyCategoryService.getPolicyCategoryById(id);
        return ResponseEntity.ok(PolicyCategoryResponse.from(category));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyCategoryResponse> updatePolicyCategory(@PathVariable Long id, @RequestBody PolicyCategoryRequest request) {
        PolicyCategory category = policyCategoryService.updatePolicyCategory(id, request.getName(), request.getDescription());
        return ResponseEntity.ok(PolicyCategoryResponse.from(category));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyCategoryResponse> deletePolicyCategory(@PathVariable Long id) {
        PolicyCategory category = policyCategoryService.deletePolicyCategory(id);
        return ResponseEntity.ok(PolicyCategoryResponse.from(category));
    }

    @GetMapping("/active")
    public ResponseEntity<List<PolicyCategoryResponse>> getActivePolicyCategories() {
        List<PolicyCategoryResponse> categories = policyCategoryService.getActivePolicyCategories()
                .stream()
                .map(PolicyCategoryResponse::from)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @PatchMapping("/{id}/reactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PolicyCategoryResponse> reactivatePolicyCategory(@PathVariable Long id) {
        PolicyCategory category = policyCategoryService.reactivatePolicyCategory(id);
        return ResponseEntity.ok(PolicyCategoryResponse.from(category));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PolicyCategoryResponse>> getAllPolicyCategories() {
        List<PolicyCategoryResponse> categories = policyCategoryService.getAllCategories()
                .stream()
                .map(PolicyCategoryResponse::from)
                .toList();
        return ResponseEntity.ok(categories);
    }


}
