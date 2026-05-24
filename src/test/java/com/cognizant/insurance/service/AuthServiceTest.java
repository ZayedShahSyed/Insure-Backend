package com.cognizant.insurance.service;

import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.UserRepository;
import com.cognizant.insurance.security.CustomUserDetails;
import com.cognizant.insurance.security.JwtTokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenService jwtTokenService;

    @Mock
    private AuthenticationConfiguration authenticationConfiguration;

    @InjectMocks
    private AuthService authService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setFullName("Test User");
        testUser.setEmail("test@example.com");
        testUser.setPasswordHash("hashedPassword");
        testUser.setPhone("9000000001");
        testUser.setRole(Role.CUSTOMER);
        testUser.setActive(true);
    }

    @Test
    void loadUserByUsername_existingUser_returnsUserDetails() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        var userDetails = authService.loadUserByUsername("test@example.com");

        assertNotNull(userDetails);
        assertEquals("test@example.com", userDetails.getUsername());
        assertInstanceOf(CustomUserDetails.class, userDetails);
    }

    @Test
    void loadUserByUsername_nonExistingUser_throwsException() {
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class,
                () -> authService.loadUserByUsername("unknown@example.com"));
    }

    @Test
    void register_newUser_success() {
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(userRepository.existsByPhone("9111111111")).thenReturn(false);
        when(passwordEncoder.encode("Password@123")).thenReturn("encodedHash");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(10L);
            return u;
        });
        when(jwtTokenService.generateToken(any(CustomUserDetails.class), anyMap())).thenReturn("jwt-token");

        Map<String, Object> result = authService.register("New User", "new@example.com",
                "Password@123", "9111111111", Role.CUSTOMER);

        assertEquals("jwt-token", result.get("token"));
        assertEquals("new@example.com", result.get("email"));
        assertEquals("CUSTOMER", result.get("role"));
        assertEquals("New User", result.get("fullName"));
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_duplicateEmail_throwsException() {
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertThrows(IllegalArgumentException.class,
                () -> authService.register("User", "existing@example.com", "pass", "9000000000", Role.CUSTOMER));
    }

    @Test
    void register_duplicatePhone_throwsException() {
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(userRepository.existsByPhone("9000000001")).thenReturn(true);

        assertThrows(IllegalArgumentException.class,
                () -> authService.register("User", "new@example.com", "pass", "9000000001", Role.CUSTOMER));
    }

    @Test
    void register_nullRole_defaultsToCustomer() {
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(passwordEncoder.encode(anyString())).thenReturn("hash");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(11L);
            return u;
        });
        when(jwtTokenService.generateToken(any(), anyMap())).thenReturn("token");

        Map<String, Object> result = authService.register("User", "new@example.com", "pass", null, null);

        assertEquals("CUSTOMER", result.get("role"));
    }
}

