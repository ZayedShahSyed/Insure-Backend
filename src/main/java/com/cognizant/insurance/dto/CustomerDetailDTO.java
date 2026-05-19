package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.PolicyEnrollment;
import com.cognizant.insurance.entity.Claim;
import com.cognizant.insurance.entity.User;

import lombok.Data;

import java.util.List;

@Data
public class CustomerDetailDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private Boolean isActive;
    private String city;
    private String state;
    private List<PolicyEnrollment> enrollments;
    private List<Claim> claims;
    public CustomerDetailDTO(User user) {
        this.id = user.getId();
        this.fullName = user.getFullName();
        this.email = user.getEmail();
        this.phone = user.getPhone();
        this.isActive = user.getActive();
        this.city = user.getCity();
        this.state = user.getState();
        this.enrollments = user.getPolicyEnrollments();
        this.claims = user.getClaims();
    }
}