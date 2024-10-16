package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MetricaEntity {

    @Id
    private String id;

    @NotBlank
    private Long sort;

    @NotBlank
    private String title;

    @NotBlank
    private String shortTitle;

    @NotBlank
    private String icon;
    @NotBlank
    private String typeCode;

    @NotBlank
    private String inputCode;
}
