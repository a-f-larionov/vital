package com.vital.controllers;

import java.time.Instant;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.TaskDTO;
import com.vital.dto.TikDTO;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;
import com.vital.repositories.TiksRepository;
import com.vital.repositories.TaskRepository;

@RestController
public class TaskController {

    final TaskRepository taskRepository;
    final TiksRepository taskTiksRepository;

    TaskController(TaskRepository taskRepository, TiksRepository taskDaysRepository) {
        this.taskRepository = taskRepository;
        this.taskTiksRepository = taskDaysRepository;
    }

    @PostMapping("/api/tasks-add")
    public ResponseDTO taskAdd(@RequestBody TaskDTO dto) {
        taskRepository.save(new TaskEntity(dto));
        return new ResponseDTO("OK");
    }

    @PostMapping("/api/tasks-archive")
    public ResponseDTO taskArchive(@RequestBody TaskDTO taskDTO) {
        var entity = taskRepository.findById(taskDTO.getId());
        entity.setIsArchived(true);
        taskRepository.save(entity);
        return new ResponseDTO("OK");
    }

    @PostMapping("/api/tasks-update")
    public ResponseDTO taskUpdate(@RequestBody TaskDTO dto) {

        var taskEntity = taskRepository.findById(dto.getId());

        taskEntity.setTitle(dto.getTitle());

        taskRepository.save(taskEntity);

        return new ResponseDTO("OK");
    }

    @GetMapping("/api/tasks-list")
    public List<TaskDTO> getTasks() {

        var list = taskRepository.findByIsArchivedFalse();

        var tiks = taskTiksRepository.findAll();
        
        System.out.println("-----------------");
        System.out.println(tiks.getFirst().getDatetime());
        System.out.println(ZoneId.systemDefault());
    
        var groupedTiks = tiks.stream()
                .collect(Collectors.groupingBy(TikEntity::getTid));

        return list.stream()
                .map(entity -> new TaskDTO(entity, groupedTiks.getOrDefault(entity.getId(), new ArrayList())))
                .toList();

    }

    @PostMapping("/api/tiks-add")
    public ResponseDTO tikAdd(@RequestBody TikDTO tikDto) {

        TikEntity entity = new TikEntity(tikDto);

        taskTiksRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-days-info")
    public ResponseDTO taskDaysInfo(@RequestBody TaskDTO task) {

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-month-info")
    public ResponseDTO taskMonthInfo(@RequestBody TaskDTO task) {

        return new ResponseDTO("OK");
    }

    @PostMapping("/api/task-calendar-year-info")
    public ResponseDTO taskCalendarYearInfo(@RequestBody TaskDTO task) {

        return new ResponseDTO("OK");
    }

}