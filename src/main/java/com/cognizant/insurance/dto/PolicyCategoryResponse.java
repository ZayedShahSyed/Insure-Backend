package com.cognizant.insurance.dto;

import com.cognizant.insurance.entity.PolicyCategory;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PolicyCategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public static PolicyCategoryResponse from(PolicyCategory category) {
        PolicyCategoryResponse response = new PolicyCategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setIsActive(category.getIsActive());
        response.setCreatedAt(category.getCreatedAt());
        return response;
    }
}

