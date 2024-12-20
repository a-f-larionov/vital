package com.vital.entities;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "task_entity")
public class TaskEntity {

    @Id
    private String id;

    @NotBlank
    @Column(nullable = false)
    private String uid;

    private Instant created;

    private Boolean isArchived = false;

    @Size(min = 1)
    private String title;

    private Instant tikLastUpdate;
    
    private Boolean sortToBottom = false;

    @OneToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL }, mappedBy = "task")
    @Fetch(FetchMode.SUBSELECT)
    public List<MetricaEntity> metrics = new LinkedList<>();

}
