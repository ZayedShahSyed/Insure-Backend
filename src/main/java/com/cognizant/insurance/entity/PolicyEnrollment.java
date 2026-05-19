package com.cognizant.insurance.entity;

import com.cognizant.insurance.entity.enums.EnrollmentStatus;
import com.cognizant.insurance.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "policy_enrollments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PolicyEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enrollment_number", unique = true, nullable = false, length = 50)
    private String enrollmentNumber;

    @Column(name = "premium_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal premiumAmount;

    @Column(name = "tenure_years", nullable = false)
    private Integer tenureYears;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, columnDefinition = "ENUM('PENDING','PAID','FAILED') DEFAULT 'PENDING'")
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, columnDefinition = "ENUM('PENDING','ACTIVE','EXPIRED','CANCELLED') DEFAULT 'PENDING'")
    private EnrollmentStatus status = EnrollmentStatus.PENDING;

    @Column(name = "approved_at")
    private LocalDateTime approvedAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships

    // The user who purchased the policy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private User customer;

    // The admin user who approved the enrollment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_by")
    private User approvedBy;

    // The specific plan chosen
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_plan_id", nullable = false)
    private PolicyPlan policyPlan;

    // Link to the people covered under this enrollment (4.6)
    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL)
    private List<EnrollmentPerson> enrollmentPeople;

    // Link to claims made against this enrollment
    @OneToMany(mappedBy = "enrollment")
    private List<Claim> claims;
}
