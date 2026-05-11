package com.cognizant.insurance.entity;

import com.cognizant.insurance.entity.enums.PremiumBasis;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "policy_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PolicyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plan_name", nullable = false, length = 100)
    private String planName;

    @Column(name = "coverage_amount", precision = 15, scale = 2)
    private BigDecimal coverageAmount;

    @Column(name = "premium_amount", precision = 10, scale = 2)
    private BigDecimal premiumAmount;

    @Enumerated(EnumType.STRING)
    @Column(name = "premium_basis", columnDefinition = "ENUM('FLAT','AGE_BASED')")
    private PremiumBasis premiumBasis;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private List<Integer> tenureOptions; // Assuming list of years like [1, 2, 3]

    @Column(name = "max_members")
    private Integer maxMembers;

    @Column(name = "room_rent_limit", precision = 10, scale = 2)
    private BigDecimal roomRentLimit;

    @Column(name = "renewal_allowed", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean renewalAllowed = true;

    @Column(name = "is_active", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Relationships

    // Many plans belong to one master policy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "policy_id", nullable = false)
    private Policy policy;

     // One plan can have many enrollments
     @OneToMany(mappedBy = "policyPlan")
     private List<PolicyEnrollment> enrollments;
}