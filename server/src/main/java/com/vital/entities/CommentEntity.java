package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "comment_entity")
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
    
    private Boolean isArchived = false;

    @NotBlank
    private String text;
}
