package com.vital.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.vital.dto.TaskDTO;
import com.vital.dto.TikDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
public class TikEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @CreationTimestamp
    private LocalDateTime datetime;

    private String tid;

    private Long times;
    private Long seconds;

    private Long m1;
    private Long m2;
    private Long m3;
    private Long m4;

    public TikEntity(TikDTO tikDTO){
        this.id = tikDTO.getId();
        this.tid = tikDTO.getTid();
        this.datetime = tikDTO.getDatetime();
        
        this.times = tikDTO.getTimes();
        this.seconds = tikDTO.getSeconds();
    }
}
