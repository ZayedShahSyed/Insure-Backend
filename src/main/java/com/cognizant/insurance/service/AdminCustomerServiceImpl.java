package com.cognizant.insurance.service.impl;

import com.cognizant.insurance.dto.CustomerDetailDTO;
import com.cognizant.insurance.dto.CustomerResponseDTO;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.UserRepository;
import com.cognizant.insurance.service.AdminCustomerService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminCustomerServiceImpl implements AdminCustomerService {

    private final UserRepository userRepository;
    @Override
    public List<CustomerResponseDTO> getAllCustomers() {

        List<User> users = userRepository.findAll();
        return users.stream()
                .filter(user -> user.getRole() == Role.CUSTOMER)
                .map(user -> new CustomerResponseDTO(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getActive()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDetailDTO getCustomerDetails(Long customerId) {

        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        return new CustomerDetailDTO(user);
    }

    @Override
    public void updateCustomerStatus(Long customerId, boolean active) {

        User user = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        user.setActive(active);

        userRepository.save(user);
    }


    @Override
    public List<CustomerResponseDTO> searchCustomers(String name,
                                                     String email,
                                                     EnrollmentStatus status,
                                                     Long policyId) {

        List<User> users = userRepository.findAll();

        return users.stream()
                .filter(user -> user.getRole() == Role.CUSTOMER)

                .filter(user -> name == null || user.getFullName().toLowerCase().contains(name.toLowerCase()))

                .filter(user -> email == null || user.getEmail().toLowerCase().contains(email.toLowerCase()))

                .map(user -> new CustomerResponseDTO(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getActive()
                ))
                .collect(Collectors.toList());
    }
}