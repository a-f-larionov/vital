package com.vital.dto.rq;

import java.time.Instant;
import java.util.List;

import com.vital.dto.MetricaDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class TaskRqDTO {

    @NotBlank
    private String id;

    @NotBlank
    private String uid;

    @Size(min = 1)
    private String title;

    //@todo-r created auto-truncate seconds???
    private Instant created;

    private Instant tikLastUpdate;

    private Boolean sortToBottom;

    private List<MetricaDTO> metrics;
}
