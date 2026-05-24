package com.cognizant.insurance.controller;

import com.cognizant.insurance.dto.LoginRequest;
import com.cognizant.insurance.dto.RegisterRequest;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequest request) {
        String phone = (request.getPhone() != null && request.getPhone().isBlank()) ? null : request.getPhone();
        Map<String, Object> response = authService.register(
                request.getFullName().trim(),
                request.getEmail().trim(),
                request.getPassword(),
                phone,
                Role.CUSTOMER
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        Map<String, Object> response = authService.login(request.getEmail().trim(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> currentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(Map.of(
                "userId", userDetails.getId(),
                "email", userDetails.getUsername(),
                "role", userDetails.getRole().name()
        ));
    }
}
