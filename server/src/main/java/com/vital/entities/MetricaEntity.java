package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class MetricaEntity {
    
    @Id
    public String id;

    @NotBlank
    public String title;

    @NotBlank
    public String shortTitle;
}
