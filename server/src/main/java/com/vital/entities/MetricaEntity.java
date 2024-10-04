package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

@Entity
public class MetricaEntity {
    
    @Id
    public String id;

    @Size(min = 1)
    public String title;

    @Size(min = 1)
    public String shortTitle;
}
