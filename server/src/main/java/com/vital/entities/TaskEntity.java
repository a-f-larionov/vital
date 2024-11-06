package com.vital.entities;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
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
    @Column(nullable = false)
    private String uid;

    @CreationTimestamp
    private Instant created;

    // Например, по дефолту hibernate при удалении связанных сущностей вначалей
    // делает update связанной сущности, присваивая внешнему ключу значение null, а
    // лишь потом удаляет связанную сущность. Фиксится поведение указанием
    // updatable=false в аннотации @JoinColumn.
    private Boolean isArchived = false;

    @Size(min = 1)
    private String title;

    @OneToMany(fetch = FetchType.LAZY, cascade = { CascadeType.ALL }, mappedBy = "task")
    @Fetch(FetchMode.SUBSELECT)
    public List<MetricaEntity> metrics = new LinkedList<>();

}
