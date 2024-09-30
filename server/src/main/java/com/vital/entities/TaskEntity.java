package com.vital.entities;

import com.vital.dto.TaskDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;

@Entity
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Size(min = 1)
    private String title;

    private String measure1Title;
    private String measure2Title;
    private String measure3Title;
    private String measure4Title;

    public String getMeasure1Title() {
        return measure1Title;
    }

    public void setMeasure1Title(String measure1Title) {
        this.measure1Title = measure1Title;
    }

    public String getMeasure2Title() {
        return measure2Title;
    }

    public void setMeasure2Title(String measure2Title) {
        this.measure2Title = measure2Title;
    }

    public String getMeasure3Title() {
        return measure3Title;
    }

    public void setMeasure3Title(String measure3Title) {
        this.measure3Title = measure3Title;
    }

    public String getMeasure4Title() {
        return measure4Title;
    }

    public void setMeasure4Title(String measure4Title) {
        this.measure4Title = measure4Title;
    }

    public TaskEntity() {
    }

    public TaskEntity(TaskDTO task) {
        this.id = task.getId();
        this.title = task.getTitle();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

}
