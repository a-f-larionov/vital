package com.vital.mappers;

import org.mapstruct.Mapper;

import com.vital.dto.TaskDTO;
import com.vital.entities.TaskEntity;

@Mapper(componentModel = "spring")
public interface TaskMapper {

    TaskEntity toEntity(TaskDTO taskDto);
}
