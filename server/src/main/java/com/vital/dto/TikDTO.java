package com.vital.dto;

import java.time.Instant;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TikDTO {

    @NotBlank
    private String uid;
    
    private String id;
    private String tid;

    private Instant datetime;

    private Long m1;
    private Long m2;
    private Long m3;
    private Long m4;
}
