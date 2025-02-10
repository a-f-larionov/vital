package com.vital.mappers;

import org.mapstruct.Mapper;

import com.vital.dto.rq.MaterialRqDTO;
import com.vital.dto.rs.MaterialRsDTO;
import com.vital.entities.MaterialEntity;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface MaterialMapper {

    MaterialRsDTO toDTO(MaterialEntity entity);

    MaterialEntity toEntity(MaterialRqDTO materialRqDTO);

    void mergeToUpdate(@MappingTarget MaterialEntity materialEntity, MaterialRqDTO materialRqDTO);
}
