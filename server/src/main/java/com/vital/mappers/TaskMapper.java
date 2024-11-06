package com.vital.mappers;

import javax.swing.MenuElement;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.vital.dto.MetricaDTO;
import com.vital.dto.TikDTO;
import com.vital.dto.rq.TaskRqDTO;
import com.vital.dto.rs.TaskRsDTO;
import com.vital.entities.MetricaEntity;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    @Mapping(target = "isArchived", ignore = true)
    @Mapping(target = "created", ignore = true)
    TaskEntity toEntity(TaskRqDTO taskRqDTO);

    @Mapping(target = "task.id", source = "taskId")
    MetricaEntity toMetricaEntity(MetricaDTO metricaDTO);

    TaskRsDTO toDTO(TaskEntity taskEntity);

    TikDTO toDTO(TikEntity tikEntity);

    void toUpdate(@MappingTarget TaskEntity entity, TaskRqDTO taskRqDTO);

}
