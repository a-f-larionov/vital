package com.vital.dto;

import java.time.Instant;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class TikDTO {

    private String id;
    private String tid;

    private Instant datetime;

    private Long m1;
    private Long m2;
    private Long m3;
    private Long m4;
}
