package com.cognizant.insurance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimRequest {
    private Long enrollmentId;
    private String claimType;
    private LocalDate incidentDate;
    private String hospitalName;
    private String diagnosis;
    private String description;
    private BigDecimal claimedAmount;
    private Map<String, Object> documents; // e.g., {"bills": "url", "discharge_summary": "url"}
}

