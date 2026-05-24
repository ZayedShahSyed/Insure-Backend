package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.PolicyRequest;
import com.cognizant.insurance.entity.Policy;
import com.cognizant.insurance.entity.PolicyCategory;
import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.entity.enums.PolicyType;
import com.cognizant.insurance.entity.enums.Role;
import com.cognizant.insurance.repository.PolicyCategoryRepository;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.PolicyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PolicyServiceTest {

    @Mock
    private PolicyRepository policyRepository;

    @Mock
    private PolicyCategoryRepository policyCategoryRepository;

    @Mock
    private PolicyEnrollmentRepository enrollmentRepository;

    @InjectMocks
    private PolicyService policyService;

    private User adminUser;
    private PolicyCategory category;
    private Policy existingPolicy;

    @BeforeEach
    void setUp() {
        adminUser = new User();
        adminUser.setId(1L);
        adminUser.setFullName("Admin");
        adminUser.setRole(Role.ADMIN);

        category = new PolicyCategory();
        category.setId(1L);
        category.setName("Health");
        category.setIsActive(true);

        existingPolicy = new Policy();
        existingPolicy.setId(1L);
        existingPolicy.setPolicyCode("POL-ABCD1234");
        existingPolicy.setName("Health Shield");
        existingPolicy.setCategory(category);
        existingPolicy.setCreatedBy(adminUser);
        existingPolicy.setIsActive(true);
    }

    @Test
    void createPolicy_success() {
        PolicyRequest request = new PolicyRequest();
        request.setName("New Policy");
        request.setPolicyType(PolicyType.INDIVIDUAL);
        request.setDescription("A new policy");
        request.setCategoryId(1L);
        request.setMinAge(18);
        request.setMaxAge(65);

        when(policyRepository.existsByName("New Policy")).thenReturn(false);
        when(policyCategoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(policyRepository.save(any(Policy.class))).thenAnswer(invocation -> {
            Policy p = invocation.getArgument(0);
            p.setId(2L);
            return p;
        });

        Policy result = policyService.createPolicy(request, adminUser);

        assertNotNull(result);
        assertTrue(result.getPolicyCode().startsWith("POL-"));
        assertEquals("New Policy", result.getName());
        assertEquals(category, result.getCategory());
        assertEquals(adminUser, result.getCreatedBy());
        assertTrue(result.getIsActive());
    }

    @Test
    void createPolicy_duplicateName_throwsException() {
        PolicyRequest request = new PolicyRequest();
        request.setName("Health Shield");

        when(policyRepository.existsByName("Health Shield")).thenReturn(true);

        assertThrows(IllegalArgumentException.class,
                () -> policyService.createPolicy(request, adminUser));
    }

    @Test
    void createPolicy_invalidCategory_throwsException() {
        PolicyRequest request = new PolicyRequest();
        request.setName("New Policy");
        request.setCategoryId(999L);

        when(policyRepository.existsByName("New Policy")).thenReturn(false);
        when(policyCategoryRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> policyService.createPolicy(request, adminUser));
    }

    @Test
    void getPolicyById_found() {
        when(policyRepository.findByIdWithRelations(1L)).thenReturn(Optional.of(existingPolicy));

        Policy result = policyService.getPolicyById(1L);

        assertEquals("Health Shield", result.getName());
    }

    @Test
    void getPolicyById_notFound_throwsException() {
        when(policyRepository.findByIdWithRelations(999L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> policyService.getPolicyById(999L));
    }

    @Test
    void updatePolicy_partialUpdate_success() {
        PolicyRequest request = new PolicyRequest();
        request.setDescription("Updated description");
        // name is null → should not update name

        when(policyRepository.findByIdWithRelations(1L)).thenReturn(Optional.of(existingPolicy));
        when(policyRepository.save(any(Policy.class))).thenAnswer(i -> i.getArgument(0));

        Policy result = policyService.updatePolicy(1L, request, 1L);

        assertEquals("Updated description", result.getDescription());
        assertEquals("Health Shield", result.getName()); // unchanged
    }

    @Test
    void updatePolicy_differentAdmin_throwsException() {
        PolicyRequest request = new PolicyRequest();
        request.setDescription("hack");

        when(policyRepository.findByIdWithRelations(1L)).thenReturn(Optional.of(existingPolicy));

        assertThrows(RuntimeException.class,
                () -> policyService.updatePolicy(1L, request, 999L));
    }

    @Test
    void deletePolicy_softDeletesAndCancelsEnrollments() {
        when(policyRepository.findByIdWithRelations(1L)).thenReturn(Optional.of(existingPolicy));
        when(policyRepository.save(any(Policy.class))).thenAnswer(i -> i.getArgument(0));

        PolicyEnrollment activeEnrollment = new PolicyEnrollment();
        activeEnrollment.setId(10L);
        activeEnrollment.setStatus(EnrollmentStatus.ACTIVE);

        when(enrollmentRepository.findByPolicyPlan_Policy_IdAndStatusIn(eq(1L), anyList()))
                .thenReturn(List.of(activeEnrollment));
        when(enrollmentRepository.saveAll(anyList())).thenReturn(List.of(activeEnrollment));

        Policy result = policyService.deletePolicy(1L, 1L);

        assertFalse(result.getIsActive());
        assertEquals(EnrollmentStatus.CANCELLED, activeEnrollment.getStatus());
    }

    @Test
    void reactivatePolicy_success() {
        existingPolicy.setIsActive(false);
        when(policyRepository.findByIdWithRelations(1L)).thenReturn(Optional.of(existingPolicy));
        when(policyRepository.save(any(Policy.class))).thenAnswer(i -> i.getArgument(0));

        Policy result = policyService.reactivatePolicy(1L, 1L);

        assertTrue(result.getIsActive());
    }
}

