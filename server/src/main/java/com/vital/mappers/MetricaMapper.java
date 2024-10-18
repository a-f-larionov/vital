package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.MetricaDto;
import com.vital.entities.MetricaEntity;

@Mapper(componentModel = "spring")
public interface MetricaMapper {

    public List<MetricaDto> toDto(List<MetricaEntity> list);

}
