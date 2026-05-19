package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.EnrollmentPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentPersonRepository extends JpaRepository<EnrollmentPerson, Long> {
    List<EnrollmentPerson> findByEnrollmentId(Long enrollmentId);
}

