package com.vital.dto.rs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricaTemplateRsDto {

    private String id;

    @NotNull
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

    @NotBlank
    private String viewCode;

}
