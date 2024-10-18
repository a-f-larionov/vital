package com.vital.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.vital.dto.rq.CommentRqDTO;
import com.vital.entities.CommentEntity;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "isArchived", ignore = true)
    CommentEntity toEntity(CommentRqDTO dto);
}