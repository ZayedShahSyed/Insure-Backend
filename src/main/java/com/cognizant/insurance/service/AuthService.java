package com.cognizant.insurance.service;

import com.cognizant.insurance.controller.AuthController;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.UserRepository;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.security.JwtTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenService jwtTokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new CustomUserDetails(user);
    }

    @Transactional
    public Map<String, Object> register(String fullName, String email, String password,
                                        String phone, Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (phone != null && userRepository.existsByPhone(phone)) {
            throw new IllegalArgumentException("Phone number already registered");
        }

        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setPhone(phone);
        user.setRole(role != null ? role : Role.CUSTOMER);
        user.setActive(true);

        userRepository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtTokenService.generateToken(userDetails, Map.of("role", user.getRole().name()));

        return Map.of(
                "token", token,
                "userId", user.getId(),
                "email", user.getEmail(),
                "role", user.getRole().name(),
                "fullName", user.getFullName()
        );
    }

    @Transactional
    public Map<String, Object> login(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            User user = userDetails.getUser();

            if (!Boolean.TRUE.equals(user.getActive())) {
                throw new BadCredentialsException("Account is deactivated");
            }

            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);

            String token = jwtTokenService.generateToken(userDetails, Map.of("role", user.getRole().name()));

            return Map.of(
                    "token", token,
                    "userId", user.getId(),
                    "email", user.getEmail(),
                    "role", user.getRole().name(),
                    "fullName", user.getFullName()
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}

