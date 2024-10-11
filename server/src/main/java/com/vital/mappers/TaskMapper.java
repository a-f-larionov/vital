package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

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

    @Mapping(target = "m1.id", source = "taskEntity.m1.id")
    TaskRsDTO toDTO(TaskEntity taskEntity, List<TikEntity> tiks);

    TikDTO toDTO(TikEntity tikEntity);
}
