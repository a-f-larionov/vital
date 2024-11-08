package com.vital.dto.rs;

import java.util.ArrayList;
import java.util.List;

import com.vital.dto.MetricaDTO;
import com.vital.dto.TikDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskRsDTO {

    @NotBlank
    private String uid;

    private String id;

    @Size(min = 1)
    private String title = "";

    private List<MetricaDTO> metrics;
}
