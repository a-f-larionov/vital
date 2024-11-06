package com.vital.entities;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
public class MetricaEntity {

    @Id
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private TaskEntity task;

    @NotNull
    @Column(nullable = false)
    private Long sort;

    @NotBlank
    private String title;

    private String shortTitle;

    @NotBlank
    private String icon;

    @NotBlank
    private String typeCode;

    @NotBlank
    private String inputCode;

    private String viewCode;

    @NotBlank
    private String templateId;

    @OneToMany(fetch = FetchType.EAGER, cascade = { CascadeType.ALL })
    @Fetch(FetchMode.SUBSELECT)
    @JoinColumn(name = "mid")
    @SQLRestriction("is_archived = false")
    private List<TikEntity> tiks = new ArrayList<>();
}
