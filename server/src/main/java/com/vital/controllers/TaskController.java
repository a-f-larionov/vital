package com.vital.controllers;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.rq.MetricResetRqDTO;
import com.vital.dto.rq.TaskArchiveDTO;
import com.vital.dto.rq.TaskListRqDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.dto.rs.TaskRsDTO;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;
import com.vital.mappers.TaskMapper;
import com.vital.mappers.TikMapper;
import com.vital.repositories.MetricaRepository;
import com.vital.repositories.TaskRepository;
import com.vital.repositories.TiksRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    final TaskRepository taskRepository;
    final TiksRepository tiksRepository;
    final MetricaRepository metricaRepository;
    final TaskMapper taskMapper;
    final TikMapper tikMapper;

    @PostMapping("/add")
    public ResponseDTO add(@RequestBody @Valid TaskRqDTO taskRqDto) {

        return updateOrAdd(taskRqDto);
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TaskRqDTO taskRqDto) {

        if (taskRqDto.getId() == null) {
            throw new RuntimeException("Id required");
        }

        return updateOrAdd(taskRqDto);
    }

    private ResponseDTO updateOrAdd(@Valid TaskRqDTO taskRqDto) {
        var entity = taskMapper.toEntity(taskRqDto);

        // @todo move it to mapper
        entity.getMetrics().forEach(m -> {
            m.setTaskId(taskRqDto.getId());
        });

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

    @PostMapping("/list")
    public List<TaskRsDTO> list(@RequestBody @Valid TaskListRqDTO taskListRqDTo) {

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

    @PostMapping("/metric/reset")
    public ResponseDTO metricReset(@RequestBody @Valid MetricResetRqDTO rqDto) {

        var tikList = tiksRepository.findAllByUidAndTidAndDatetimeAfterAndIsArchivedFalse(
                rqDto.getUid(),
                rqDto.getTaskId(),
                Instant.now().truncatedTo(ChronoUnit.DAYS));

        tikList.forEach(tik -> {
            switch (rqDto.getMIndex()) {
                case 1 -> tik.setValue(0L);
                default -> tik.setValue(tik.getValue());
            }
        });

        tikList.forEach((tik) -> {
            tiksRepository.save(tik);
        });

        return new ResponseDTO("OK");
    }
}