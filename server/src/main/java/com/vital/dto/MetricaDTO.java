package com.vital.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricaDTO {

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
