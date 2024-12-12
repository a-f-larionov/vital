package com.vital.controllers;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

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
import com.vital.repositories.MetricRepository;
import com.vital.repositories.TaskRepository;
import com.vital.repositories.TiksRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
@Transactional
public class TaskController {

    final TaskRepository taskRepository;
    final TiksRepository tiksRepository;
    final MetricRepository metricaRepository;
    final TaskMapper taskMapper;
    final TikMapper tikMapper;
 
    @PostMapping("/add")
    public ResponseDTO add(@RequestBody @Valid TaskRqDTO taskRqDto) {

        /**
         * Сохранение всех полей task.id,uid,title, (created is auto field), isArhive = false
         * Сохранние вложенных метрик всех полей
         * Тикс не трогаем
         */
        var entity = taskMapper.toEntity(taskRqDto);

        taskRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TaskRqDTO taskRqDto) {

        var taskEntity = taskRepository.findByUidAndId(taskRqDto.getUid(), taskRqDto.getId());
        taskMapper.toUpdate(taskEntity, taskRqDto);

        taskRepository.save(taskEntity);
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

        return tasks.stream()
                .map(taskMapper::toDTO)
                .toList();
    }

    @PostMapping("/metric/reset")
    public ResponseDTO metricReset(@RequestBody @Valid MetricResetRqDTO rqDto) {

        taskRepository.setTikLastUpdate(rqDto.getTaskId());

        var tikList = tiksRepository.findAllByUidAndTidAndMidAndDatetimeAfterAndIsArchivedFalse(
                rqDto.getUid(),
                rqDto.getTaskId(),
                rqDto.getMetricaId(),
                rqDto.getDatetimeFrom());
                
        tikList.forEach(tik -> {
            tik.setValue(0L);
            tiksRepository.save(tik);
        });

        if (tikList.isEmpty()) {
            tiksRepository.save(new TikEntity(
                    UUID.randomUUID().toString(),
                    rqDto.getMetricaId(),
                    rqDto.getUid(),
                    rqDto.getTaskId(),
                    null,
                    false,
                    Instant.now(),
                    0L));
        }

        return new ResponseDTO("OK");
    }
}