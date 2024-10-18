package com.vital.entities;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "taskId")
    private List<MetricaEntity> metrics;

}
