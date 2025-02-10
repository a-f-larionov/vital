package com.vital.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "material_entity")
public class MaterialEntity {

    @Id
    private String id;

    @NotBlank
    private String uid;

    @NotBlank
    private String title;

    private Instant created;

    private Boolean isArchived = false;

    private Instant finished;
}
