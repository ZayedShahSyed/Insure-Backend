package com.cognizant.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentPersonRequest {
    private String fullName;
    private String personType;
    private String relationship;
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;
}

