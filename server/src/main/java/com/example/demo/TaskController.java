package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

    final TaskRepository taskRepository;

    TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PostMapping("/api/tasks-add")
    public void taskAdd(@RequestBody TaskDTO task) {
        taskRepository.save(new TaskEntity(task));
    }

    @PostMapping("/api/tasks-delete")
    public void taskDelete(@RequestBody TaskDTO task) {
        taskRepository.deleteById(task.getId());
    }

    @GetMapping("/api/tasks-list")
    public List<TaskDTO> getTasks() {

        var list = taskRepository.findAll();

        return list.stream()
                .map(entity -> new TaskDTO(entity))
                .toList();

    }

}