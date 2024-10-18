package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.rs.MetricaTemplateRsDto;
import com.vital.entities.MetricaTemplateEntity;

@Mapper(componentModel = "spring")
public interface MetricaTemplateMapper {

    public List<MetricaTemplateRsDto> toDto(List<MetricaTemplateEntity> list);

}
