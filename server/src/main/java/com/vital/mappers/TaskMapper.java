package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.TaskDTO;
import com.vital.dto.TikDTO;
import com.vital.entities.TaskEntity;
import com.vital.entities.TikEntity;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskEntity toEntity(TaskDTO taskDto);
    
    TaskDTO toDTO(TaskEntity taskEntity, List<TikEntity> tiks);

    TikDTO toDTO(TikEntity tikEntity);
}