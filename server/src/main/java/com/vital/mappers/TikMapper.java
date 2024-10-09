package com.vital.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.vital.dto.TikDTO;
import com.vital.entities.TikEntity;

@Mapper(componentModel = "spring")
public interface TikMapper {

    @Mapping(target = "isArchived", ignore = true)
    TikEntity toEntity(TikDTO dto);
}