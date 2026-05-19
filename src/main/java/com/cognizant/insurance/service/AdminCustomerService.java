package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.CustomerDetailDTO;
import com.cognizant.insurance.dto.CustomerResponseDTO;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;

import java.util.List;

public interface AdminCustomerService {

    List<CustomerResponseDTO> getAllCustomers();

    CustomerDetailDTO getCustomerDetails(Long customerId);

    void updateCustomerStatus(Long customerId, boolean active);

    List<CustomerResponseDTO> searchCustomers(String name,
                                              String email,
                                              EnrollmentStatus status,
                                              Long policyId);
}