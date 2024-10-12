package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CommentEntity {

    @Id
    private String id;
    
    @NotBlank
    private String uid;

    @NotBlank
    private String tikId;

    @NotBlank
    private String taskId;

    @CreationTimestamp
    private Instant created;

    @NotBlank
    private String text;
}
