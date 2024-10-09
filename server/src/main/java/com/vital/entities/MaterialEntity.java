package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
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

    @NotBlank
    private String uid;

    @NotBlank
    private String title;

    @CreationTimestamp
    private Instant created;

    private Instant finished;
}
