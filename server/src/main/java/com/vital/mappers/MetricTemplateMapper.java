package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.rs.MetricTemplateRsDTO;
import com.vital.entities.MetricaTemplateEntity;

@Mapper(componentModel = "spring")
public interface MetricTemplateMapper {

    public List<MetricTemplateRsDTO> toDTO(List<MetricaTemplateEntity> list);

}
