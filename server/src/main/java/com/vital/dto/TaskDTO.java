package com.vital.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

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

    @JsonProperty("mId1")
    private String mId1 = "";
    @JsonProperty("mId2")
    private String mId2 = "";
    @JsonProperty("vCode1")
    private String vCode1 = "";
    @JsonProperty("vCode2")
    private String vCode2 = "";

    private List<TikDTO> tiks = new ArrayList<>();
}
