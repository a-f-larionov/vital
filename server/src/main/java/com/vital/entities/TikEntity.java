package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TikEntity {

    @Id
    private String id;

    @CreationTimestamp
    private Instant datetime;

    private String tid;

    private Long m1;
    private Long m2;
    private Long m3;
    private Long m4;
}
