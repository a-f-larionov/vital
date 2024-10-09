package com.vital.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.TaskDTO;
import com.vital.dto.rq.TaskArchiveDTO;
import com.vital.dto.rq.TaskListRqDTo;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;
import com.vital.mappers.TaskMapper;
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
    final TaskMapper taskMapper;
    final TikMapper tikMapper;

    @PostMapping("/add")
    public ResponseDTO add(@RequestBody @Valid TaskDTO taskDto, HttpEntity<byte[]> requestEntity) {

        var entity = taskMapper.toEntity(taskDto);

        taskRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid TaskArchiveDTO taskDTO) {
        var entity = taskRepository.findByUidAndId(taskDTO.getUid(), taskDTO.getId());
        entity.setIsArchived(true);
        taskRepository.save(entity);
        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TaskDTO taskDto) {

        var entity = taskMapper.toEntity(taskDto);

        taskRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/list")
    public List<TaskDTO> list(@RequestBody @Valid TaskListRqDTo taskListRqDTo) {

        List<TaskEntity> tasks = taskRepository.findByUidAndIsArchivedFalse(taskListRqDTo.getUid());

        List<TikEntity> tiks = tiksRepository.findAllByUidAndIsArchivedFalse(taskListRqDTo.getUid());

        Map<String, List<TikEntity>> groupedTiks = tiks.stream()
                .collect(Collectors.groupingBy(TikEntity::getTid));

        return tasks.stream()
                .map(task -> {
                    List<TikEntity> tiks2 = groupedTiks.getOrDefault(task.getId(), new ArrayList<>());
                    return taskMapper.toDTO(task, tiks2);
                })
                .toList();
    }

}