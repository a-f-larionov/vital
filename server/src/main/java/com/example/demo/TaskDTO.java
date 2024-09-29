package com.example.demo;

import jakarta.validation.constraints.Size;

public class TaskDTO {

    private String id;

    @Size(min = 1)
    private String title;

    private Long counter = 0L;

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }

    public TaskDTO(String id, @Size(min = 1) String title) {
        this.id = id;
        this.title = title;
    }

    public TaskDTO() {

    }

    public TaskDTO(TaskEntity entity) {

        this.id = entity.getId();
        this.title = entity.getTitle();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
