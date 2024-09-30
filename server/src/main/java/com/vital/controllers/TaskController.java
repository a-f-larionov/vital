package com.vital.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.TaskDTO;
import com.vital.entities.TaskEntity;
import com.vital.repositories.TaskDaysRepository;
import com.vital.repositories.TaskRepository;

@RestController
public class TaskController {

    final TaskRepository taskRepository;
    final TaskDaysRepository taskDaysRepository;

    TaskController(TaskRepository taskRepository, TaskDaysRepository taskDaysRepository) {
        this.taskRepository = taskRepository;
        this.taskDaysRepository = taskDaysRepository;
    }

    @PostMapping("/api/tasks-add")
    public ResponseDTO taskAdd(@RequestBody TaskDTO task) {
        taskRepository.save(new TaskEntity(task));
        return new ResponseDTO("OK");
    }

    @PostMapping("/api/tasks-delete")
    public ResponseDTO taskDelete(@RequestBody TaskDTO task) {
        taskRepository.deleteById(task.getId());
        return new ResponseDTO("OK");
    }

    @PostMapping("/api/tasks-update")
    public ResponseDTO taskUpdate(@RequestBody TaskDTO dto) {

        System.out.println("------------------------------");
        System.out.println(dto.getId());
        System.out.println(dto.getTitle());
        var taskEntity = taskRepository.findById(dto.getId());

        taskEntity.setTitle(dto.getTitle());

        taskRepository.save(taskEntity);

        return new ResponseDTO("OK");
    }

    @GetMapping("/api/tasks-list")
    public List<TaskDTO> getTasks() {

        var list = taskRepository.findAll();

        return list.stream()
                .map(entity -> new TaskDTO(entity))
                .toList();

    }

    @PostMapping("/api/task-incremt")
    public ResponseDTO taskIncrement(@RequestBody TaskDTO task) {

        // taskDaysRepository.incrementByTid(task.getId());

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-days-info")
    public ResponseDTO taskDaysInfo(@RequestBody TaskDTO task) {
        // taskDaysRepository.findByTidAndDT(task.getId());

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-month-info")
    public ResponseDTO taskMonthInfo(@RequestBody TaskDTO task) {
        // taskDaysRepository.findByTidAndDT(task.getId());

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-calendar-year-info")
    public ResponseDTO taskCalendarYearInfo(@RequestBody TaskDTO task) {
        // taskDaysRepository.findByTidAndDT(task.getId());

        return new ResponseDTO("OK");
    }

}