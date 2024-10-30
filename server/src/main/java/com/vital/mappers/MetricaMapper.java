package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.MetricaDTO;
import com.vital.entities.MetricaEntity;

@Mapper(componentModel = "spring")
public interface MetricaMapper {

    public List<MetricaDTO> toDto(List<MetricaEntity> list);

}
