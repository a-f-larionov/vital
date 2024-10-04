package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MaterialEntity {

    @Id
    private String id;

    @Size(min = 1)
    private String title;

    @CreationTimestamp
    private Instant created;

    private Instant finished;
}
