package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.Claim;
import com.cognizant.insurance.entity.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByCustomerId(Long customerId);
    List<Claim> findByStatus(ClaimStatus status);
    List<Claim> findByCustomerIdAndStatus(Long customerId, ClaimStatus status);

}