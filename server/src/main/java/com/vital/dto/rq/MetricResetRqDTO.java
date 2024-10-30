package com.vital.dto.rq;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricResetRqDTO {

    @NotBlank
    private String uid;
    @NotBlank
    private String taskId;

    @Range(min = 1, max = 4)
    @JsonProperty("mIndex")
    private Integer mIndex;
}
