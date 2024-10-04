package com.vital.mappers;

import org.mapstruct.Mapper;

import com.vital.dto.TikDTO;
import com.vital.entities.TikEntity;

@Mapper(componentModel = "spring")
public interface TikMapper {

    TikEntity toEntity(TikDTO dto);
}