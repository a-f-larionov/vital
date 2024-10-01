package com.vital.entities;

import com.vital.dto.TaskDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Size(min = 1)
    private String title;

    private Boolean isArchived = false;

    private String m1Title = "";
    private String m2Title = "";
    private String m3Title = "";
    private String m4Title = "";

    public TaskEntity(TaskDTO task) {
        this.id = task.getId();
        this.title = task.getTitle();
    }

}
