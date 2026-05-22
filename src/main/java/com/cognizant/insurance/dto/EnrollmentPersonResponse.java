package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.EnrollmentPerson;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EnrollmentPersonResponse {
    private Long id;
    private String fullName;
    private String personType;
    private String relationship;
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;

    public static EnrollmentPersonResponse from(EnrollmentPerson person) {
        EnrollmentPersonResponse response = new EnrollmentPersonResponse();
        response.setId(person.getId());
        response.setFullName(person.getFullName());
        response.setPersonType(person.getPersonType() != null ? person.getPersonType().name() : null);
        response.setRelationship(person.getRelationship() != null ? person.getRelationship().name() : null);
        response.setDateOfBirth(person.getDateOfBirth());
        response.setGender(person.getGender() != null ? person.getGender().name() : null);
        response.setPhone(person.getPhone());
        return response;
    }
}

