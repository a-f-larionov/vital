package com.vital.entities;

import java.time.Instant;
import java.util.LinkedList;
import java.util.List;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Entity
@Table(name = "task_entity")
public class TaskEntity {

    @Size(min = 36, max = 36)
    @Id
    private String id;

    @NotBlank
    @Size(min = 36, max = 36)
    @Column(nullable = false)
    private String uid;

    @Size(min = 1, max = 36)
    private String title;

    private Instant tikLastUpdate;

    @Builder.Default
    private Boolean sortToBottom = false;

    @Builder.Default
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "task", orphanRemoval = true)
    @Fetch(FetchMode.SUBSELECT)
    public List<MetricaEntity> metrics = new LinkedList<>();

    @ManyToMany // ???
    private List<MaterialEntity> materials = new LinkedList<>();

    private Instant created;

    @Builder.Default
    private Boolean isArchived = false;

}
