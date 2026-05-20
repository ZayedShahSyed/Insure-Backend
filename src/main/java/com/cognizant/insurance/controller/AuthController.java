package com.cognizant.insurance.controller;
//
//Register: POST /api/auth/register with {"fullName", "email", "password", "phone", "role"}
//Login: POST /api/auth/login with {"email", "password"} → returns {token, userId, email, role, fullName}
//Authenticated requests: Add header Authorization: Bearer <token>
//

import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.service.AuthService;
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
    public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> request) {
        String fullName = request.get("fullName");
        String email = request.get("email");
        String password = request.get("password");
        String phone = request.get("phone");

        if (fullName == null || email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "fullName, email, and password are required"));
        }

        Map<String, Object> response = authService.register(fullName, email, password, phone, Role.CUSTOMER);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "email and password are required"));
        }

        Map<String, Object> response = authService.login(email, password);
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

