package com.vital.entities;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class TaskEntity {

    @Id
    private String id;

    @NotBlank
    private String uid;

    @CreationTimestamp
    private Instant created;

    private Boolean isArchived = false;

    @Size(min = 1)
    private String title;

    private String mId1 = "";
    private String mId2 = "";
    private String vCode1 = "";
    private String vCode2 = "";
    // https://habr.com/ru/articles/460377/
}
