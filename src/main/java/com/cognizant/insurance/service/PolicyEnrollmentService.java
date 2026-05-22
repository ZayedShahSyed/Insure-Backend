package com.cognizant.insurance.service;

import com.cognizant.insurance.dto.EnrollmentPersonRequest;
import com.cognizant.insurance.dto.EnrollmentRequest;
import com.cognizant.insurance.dto.EnrollmentResponse;
import com.cognizant.insurance.entity.EnrollmentPerson;
import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.PolicyPlan;
import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.*;
import com.cognizant.insurance.repository.PolicyEnrollmentRepository;
import com.cognizant.insurance.repository.PolicyPlanRepository;
import com.cognizant.insurance.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PolicyEnrollmentService {

    private final PolicyEnrollmentRepository enrollmentRepository;
    private final PolicyPlanRepository policyPlanRepository;
    private final UserRepository userRepository;

    public PolicyEnrollmentService(PolicyEnrollmentRepository enrollmentRepository,
                                   PolicyPlanRepository policyPlanRepository,
                                   UserRepository userRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.policyPlanRepository = policyPlanRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public EnrollmentResponse enroll(Long customerId, EnrollmentRequest request) {
        PolicyPlan plan = policyPlanRepository.findByIdWithPolicy(request.getPolicyPlanId())
                .orElseThrow(() -> new RuntimeException("Policy plan not found or inactive"));

        // Validate tenure
        if (plan.getTenureOptions() != null && !plan.getTenureOptions().contains(request.getTenureYears())) {
            throw new RuntimeException("Invalid tenure. Available options: " + plan.getTenureOptions());
        }

        // Validate member count
        if (plan.getMaxMembers() != null && request.getMembers() != null
                && request.getMembers().size() > plan.getMaxMembers()) {
            throw new RuntimeException("Number of members exceeds maximum allowed: " + plan.getMaxMembers());
        }

        User customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Generate enrollment number
        String enrollmentNumber = "ENR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Calculate premium
        BigDecimal totalPremium = plan.getPremiumAmount().multiply(BigDecimal.valueOf(request.getTenureYears()));

        PolicyEnrollment enrollment = new PolicyEnrollment();
        enrollment.setEnrollmentNumber(enrollmentNumber);
        enrollment.setCustomer(customer);
        enrollment.setPolicyPlan(plan);
        enrollment.setPremiumAmount(totalPremium);
        enrollment.setTenureYears(request.getTenureYears());
        enrollment.setStartDate(LocalDate.now());
        enrollment.setEndDate(LocalDate.now().plusYears(request.getTenureYears()));
        enrollment.setPaymentStatus(PaymentStatus.PENDING);
        enrollment.setStatus(EnrollmentStatus.PENDING);

        // Add members
        List<EnrollmentPerson> people = new ArrayList<>();
        if (request.getMembers() != null) {
            for (EnrollmentPersonRequest memberReq : request.getMembers()) {
                EnrollmentPerson person = new EnrollmentPerson();
                person.setFullName(memberReq.getFullName());
                person.setPersonType(PersonType.valueOf(memberReq.getPersonType()));
                person.setRelationship(Relationship.valueOf(memberReq.getRelationship()));
                person.setDateOfBirth(memberReq.getDateOfBirth());
                person.setGender(Gender.valueOf(memberReq.getGender()));
                person.setPhone(memberReq.getPhone());
                person.setEnrollment(enrollment);
                people.add(person);
            }
        }
        enrollment.setEnrollmentPeople(people);

        PolicyEnrollment saved = enrollmentRepository.save(enrollment);
        return EnrollmentResponse.from(saved);
    }

    public List<EnrollmentResponse> getEnrollmentsByCustomer(Long customerId) {
        return enrollmentRepository.findByCustomerId(customerId).stream()
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList());
    }

    public List<EnrollmentResponse> getEnrollmentsByPolicy(Long policyId) {
        return enrollmentRepository.findByPolicyPlan_Policy_Id(policyId).stream()
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList());
    }

    public List<EnrollmentResponse> getAllEnrollments() {
        return enrollmentRepository.findAllWithDetails().stream()
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList());
    }

    public List<EnrollmentResponse> getEnrollmentsByPolicyCreator(Long adminId) {
        return enrollmentRepository.findByPolicyCreatorId(adminId).stream()
                .map(EnrollmentResponse::from)
                .collect(Collectors.toList());
    }

    public EnrollmentResponse getEnrollmentById(Long id) {
        PolicyEnrollment enrollment = enrollmentRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));
        return EnrollmentResponse.from(enrollment);
    }

    @Transactional
    public EnrollmentResponse approveEnrollment(Long enrollmentId, Long adminId) {
        PolicyEnrollment enrollment = enrollmentRepository.findByIdWithDetails(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + enrollmentId));

        // Validate admin owns the policy
        if (!enrollment.getPolicyPlan().getPolicy().getCreatedBy().getId().equals(adminId)) {
            throw new RuntimeException("You can only manage enrollments for policies you created");
        }

        if (enrollment.getStatus() != EnrollmentStatus.PENDING) {
            throw new RuntimeException("Only PENDING enrollments can be approved");
        }

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin user not found"));

        enrollment.setStatus(EnrollmentStatus.ACTIVE);
        enrollment.setPaymentStatus(PaymentStatus.PAID);
        enrollment.setApprovedBy(admin);
        enrollment.setApprovedAt(LocalDateTime.now());

        PolicyEnrollment saved = enrollmentRepository.save(enrollment);
        return EnrollmentResponse.from(saved);
    }

    @Transactional
    public EnrollmentResponse cancelEnrollment(Long enrollmentId, Long userId) {
        PolicyEnrollment enrollment = enrollmentRepository.findByIdWithDetails(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + enrollmentId));

        // Allow if user is the customer who owns the enrollment OR admin who created the policy
        boolean isCustomer = enrollment.getCustomer().getId().equals(userId);
        boolean isPolicyAdmin = enrollment.getPolicyPlan().getPolicy().getCreatedBy().getId().equals(userId);
        if (!isCustomer && !isPolicyAdmin) {
            throw new RuntimeException("You do not have permission to cancel this enrollment");
        }

        if (enrollment.getStatus() == EnrollmentStatus.CANCELLED) {
            throw new RuntimeException("Enrollment is already cancelled");
        }

        enrollment.setStatus(EnrollmentStatus.CANCELLED);
        PolicyEnrollment saved = enrollmentRepository.save(enrollment);
        return EnrollmentResponse.from(saved);
    }
}

