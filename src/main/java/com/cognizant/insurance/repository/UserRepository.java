package com.cognizant.insurance.repository;

import com.cognizant.insurance.entity.User;
import com.cognizant.insurance.entity.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    long countByRole(Role role);

    List<User> findByRole(Role role);
}

