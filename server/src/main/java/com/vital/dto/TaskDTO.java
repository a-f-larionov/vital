package com.vital.dto;

import java.util.ArrayList;
import java.util.List;

import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Setter
@Getter
public class TaskDTO {

    private String id;

    @Size(min = 1)
    private String title = "";

    private List<TikDTO> tiks = new ArrayList<>();

    public TaskDTO(String id, @Size(min = 1) String title) {
        this.id = id;
        this.title = title;
    }

    public TaskDTO(TaskEntity entity) {

        this.id = entity.getId();
        this.title = entity.getTitle();
    }

    public TaskDTO(TaskEntity entity, List<TikEntity> tiks){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.tiks = tiks.stream().map(TikDTO::new).toList();
    }
}
