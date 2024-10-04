package com.vital.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.rq.TaskArchiveDTO;
import com.vital.dto.TaskDTO;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;
import com.vital.mappers.TikMapper;
import com.vital.repositories.TaskRepository;
import com.vital.repositories.TiksRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tasks")
public class TaskController {

    final TaskRepository taskRepository;
    final TiksRepository tiksRepository;
    final TikMapper tikMapper;

    @PostMapping("/add")
    public ResponseDTO add(@RequestBody @Valid TaskDTO dto) {
        taskRepository.save(new TaskEntity(dto));
        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid TaskArchiveDTO taskDTO) {
        var entity = taskRepository.findById(taskDTO.getId());
        entity.setIsArchived(true);
        taskRepository.save(entity);
        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TaskDTO dto) {

        var taskEntity = taskRepository.findById(dto.getId());

        taskEntity.setTitle(dto.getTitle());

        taskRepository.save(taskEntity);

        return new ResponseDTO("OK");
    }

    @GetMapping("/list")
    public List<TaskDTO> list() {

        List<TaskEntity> tasks = taskRepository.findByIsArchivedFalse();

        List<TikEntity> tiks = tiksRepository.findAll();

        Map<String, List<TikEntity>> groupedTiks = tiks.stream()
                .collect(Collectors.groupingBy(TikEntity::getTid));

        return tasks.stream()
                .map(task -> {
                    List<TikEntity> tiks2 = groupedTiks.getOrDefault(task.getId(), new ArrayList<>());
                    return tikMapper.toDTO(task, tiks2);
                })
                .toList();
    }

}