package com.vital.dto.rq;

import java.util.ArrayList;
import java.util.List;

import com.vital.dto.MetricaDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskRqDTO {

    @NotBlank
    private String uid;

    private String id;

    @Size(min = 1)
    private String title = "";

    private List<MetricaDto> metrics = new ArrayList<>();
}
