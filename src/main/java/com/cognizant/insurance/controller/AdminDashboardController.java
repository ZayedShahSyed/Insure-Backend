package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.AdminDashboardResponse;
import com.cognizant.insurance.dto.UserResponse;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.UserRepository;
import com.cognizant.insurance.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;
    private final UserRepository userRepository;

    public AdminDashboardController(AdminDashboardService dashboardService, UserRepository userRepository) {
        this.dashboardService = dashboardService;
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AdminDashboardResponse> getDashboard() {
        return ResponseEntity.ok(dashboardService.getDashboard());
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UserResponse>> getAllCustomers() {
        List<User> customers = userRepository.findByRole(Role.CUSTOMER); //bug
        List<UserResponse> response = customers.stream().map(u -> {
            UserResponse dto = new UserResponse();
            dto.setUserId(u.getId());
            dto.setFullName(u.getFullName());
            dto.setEmail(u.getEmail());
            dto.setPhone(u.getPhone());
            dto.setGender(u.getGender() != null ? u.getGender().name() : null);
            dto.setDateOfBirth(u.getDateOfBirth());
            dto.setAddress(u.getAddress());
            dto.setCity(u.getCity());
            dto.setState(u.getState());
            dto.setPincode(u.getPincode());
            dto.setOccupation(u.getOccupation());
            dto.setIsActive(u.getActive());
            dto.setCreatedAt(u.getCreatedAt());
            dto.setLastLoginAt(u.getLastLoginAt());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
}


