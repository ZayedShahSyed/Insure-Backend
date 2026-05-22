package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface PolicyRepository extends JpaRepository<Policy,Long> {
    boolean existsByName(String name);

    long countByIsActiveTrue();

    @Query("SELECT p FROM Policy p JOIN FETCH p.category JOIN FETCH p.createdBy WHERE p.isActive = true")
    List<Policy> findByIsActiveTrue();

    @Query("SELECT p FROM Policy p JOIN FETCH p.category JOIN FETCH p.createdBy WHERE p.id = :id")
    Optional<Policy> findByIdWithRelations(Long id);

    @Query("SELECT p FROM Policy p JOIN FETCH p.category JOIN FETCH p.createdBy WHERE p.createdBy.id = :adminId")
    List<Policy> findByCreatedById(Long adminId);
}
