package com.vital.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.vital.dto.MetricaDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.dto.rs.TaskRsDTO;
import com.vital.entities.MetricaEntity;
import com.vital.entities.TaskEntity;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "isArchived", ignore = true)
    TaskEntity toEntity(TaskRqDTO taskRqDTO);

    @Mapping(target = "task.id", source = "taskId")
    MetricaEntity toMetricaEntity(MetricaDTO metricaDTO);

    TaskRsDTO toDTO(TaskEntity taskEntity);

    void toUpdate(@MappingTarget TaskEntity entity, TaskRqDTO taskRqDTO);

}
