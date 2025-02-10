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
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Builder
@Entity
@Table(name = "metrica_entity")
public class MetricaEntity {

    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private TaskEntity task;

    @NotNull
    @Column(nullable = false)
    private Long sort;

    @NotBlank
    @Size(max = 36)
    @Column(name = "title")
    private String title;

    @Size(max = 36)
    private String shortTitle;

    @NotBlank
    @Size(max = 36)
    private String icon;

    @NotBlank
    @Size(max = 36)
    private String typeCode;

    @NotBlank
    @Size(max = 36)
    private String inputCode;

    @Size(max = 36)
    private String viewCode;

    @NotBlank
    @Size(max = 36)
    private String templateId;

    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    @JoinColumn(name = "mid")
    @Fetch(FetchMode.SUBSELECT)
    @SQLRestriction("is_archived = false")
    private List<TikEntity> tiks = new ArrayList<>();
}
