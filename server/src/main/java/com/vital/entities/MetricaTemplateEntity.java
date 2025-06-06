package com.vital.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MetricaTemplateEntity {

    @Id
    private String id;

    @NotNull
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

    @OneToMany
    @JoinColumn(name = "mid")
    private List<TikEntity> tiks = new ArrayList<>();
    // private List<TikEntity> tiks = new ArrayList();
}
