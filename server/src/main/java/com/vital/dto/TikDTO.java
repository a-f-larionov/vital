package com.vital.dto;

import java.time.Instant;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class TikDTO {

    @NotBlank
    private String id;

    @NotBlank
    private String uid;

    @NotBlank
    private String tid;
    
    @NotBlank
    private String mid;

    private Long value;

    private Instant datetime;
}
