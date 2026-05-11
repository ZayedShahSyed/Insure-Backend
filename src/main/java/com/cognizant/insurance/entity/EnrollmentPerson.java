package com.cognizant.insurance.entity;

import com.cognizant.insurance.entity.enums.Gender;
import com.cognizant.insurance.entity.enums.PersonType;
import com.cognizant.insurance.entity.enums.Relationship;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "enrollment_people")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentPerson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "person_type", columnDefinition = "ENUM('MEMBER','NOMINEE')")
    private PersonType personType;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship", columnDefinition = "ENUM('SELF','SPOUSE','CHILD','PARENT','OTHER')")
    private Relationship relationship;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('MALE','FEMALE','OTHER')")
    private Gender gender;

    @Column(length = 20)
    private String phone;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Relationships

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private PolicyEnrollment enrollment;
}
