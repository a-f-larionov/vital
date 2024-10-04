package com.vital.dto;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskDTO {

    private String id;

    @Size(min = 1)
    private String title = "";

    private List<TikDTO> tiks = new ArrayList<>();
}
