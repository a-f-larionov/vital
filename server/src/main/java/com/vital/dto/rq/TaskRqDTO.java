package com.vital.dto.rq;

import java.util.ArrayList;
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
    private String title = "";

    private List<MetricaDTO> metrics = new ArrayList<>();
}
