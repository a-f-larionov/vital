package com.vital.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.vital.entities.TikEntity;

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
    //private LocalDateTime datetime;

    private Long times;
    private Long seconds;

    private Long m1;
    private Long m2;
    private Long m3;
    private Long m4;

    public TikDTO(TikEntity entity){
        this.id = entity.getId();
        this.tid = entity.getTid();
        this.datetime = entity.getDatetime();

        this.times = entity.getTimes();
        this.seconds = entity.getSeconds();
    }
}
