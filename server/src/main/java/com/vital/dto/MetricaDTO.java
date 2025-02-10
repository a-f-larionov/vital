package com.vital.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MetricaDTO {

    private String id;

    @NotNull
    private Long sort;

    @NotNull
    private String taskId;

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

    @NotBlank
    private String templateId;

    private List <TikDTO> tiks;
    
}
