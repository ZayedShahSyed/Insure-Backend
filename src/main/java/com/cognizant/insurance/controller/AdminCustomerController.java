package com.cognizant.insurance.controller;

import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.service.AdminCustomerService;
import com.cognizant.insurance.dto.CustomerResponseDTO;
import com.cognizant.insurance.dto.CustomerDetailDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
@RequiredArgsConstructor
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;


    @GetMapping
    public List<CustomerResponseDTO> getAllCustomers() {
        return adminCustomerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public CustomerDetailDTO getCustomerDetails(@PathVariable Long id) {
        return adminCustomerService.getCustomerDetails(id);
    }


    @PatchMapping("/{id}/status")
    public String updateCustomerStatus(@PathVariable Long id,
                                       @RequestParam boolean active) {
        adminCustomerService.updateCustomerStatus(id, active);
        return "Customer status updated successfully";
    }

    @GetMapping("/search")
    public List<CustomerResponseDTO> searchCustomers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) EnrollmentStatus status,
            @RequestParam(required = false) Long policyId
    ) {
        return adminCustomerService.searchCustomers(name, email, status, policyId);
    }
}