package com.vital.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.vital.dto.rs.MetricaTemplateRsDTO;
import com.vital.entities.MetricaTemplateEntity;

@Mapper(componentModel = "spring")
public interface MetricaTemplateMapper {

    public List<MetricaTemplateRsDTO> toDTO(List<MetricaTemplateEntity> list);

}
