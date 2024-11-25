package com.vital.dto.rq;

import java.time.Instant;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MetricResetRqDTO {

    @NotBlank
    private String uid;
    @NotBlank
    private String taskId;
    @NotBlank
    private String metricaId;
    // Validate datetimeFrom no less then 24 hours ago
    @NotNull
    private Instant datetimeFrom;
    @NotNull
    private Instant tikLastUpdate;
}
