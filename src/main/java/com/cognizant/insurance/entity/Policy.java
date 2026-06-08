package com.cognizant.insurance.entity;

import com.cognizant.insurance.entity.enums.PolicyType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "policies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "policy_code", unique = true, nullable = false, length = 50)
    private String policyCode;

    @Column(nullable = false, length = 200,unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "policy_type", columnDefinition = "ENUM('INDIVIDUAL','FAMILY_FLOATER')")
    private PolicyType policyType;

    @Column(columnDefinition = "TEXT")
    private String description;

    // JSON Mappings
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> benefits;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> exclusions;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, Object> documents;

    @Column(name = "min_age")
    @NonNull
    @Min(0)
    private Integer minAge;

    @Column(name = "max_age")
    @NonNull
    @Min(1)
    private Integer maxAge;

    @Column(name = "waiting_period_days")
    private Integer waitingPeriodDays;

    @Column(name = "is_active", columnDefinition = "TINYINT(1) DEFAULT 1")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    //  Relationships

    // Many policies belong to one category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private PolicyCategory category;

    // Many policies can be created by one admin
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    // One policy can have many plans
    @OneToMany(mappedBy = "policy", cascade = CascadeType.ALL)
    private List<PolicyPlan> policyPlans;
}