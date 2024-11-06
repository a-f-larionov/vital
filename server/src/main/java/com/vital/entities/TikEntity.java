package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    
    @NotBlank
    private String mid;
    
    @NotBlank
    private String uid;

    @NotBlank
    private String tid;

    private String oid;

    private Boolean isArchived = false;

    @CreationTimestamp
    private Instant datetime;

    @NotNull
    private Long value;
}
