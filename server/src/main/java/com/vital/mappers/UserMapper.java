package com.vital.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.vital.dto.rq.UserRqDTO;
import com.vital.dto.rs.UserRsDto;
import com.vital.entities.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "created", ignore = true)
    UserEntity toEntity(UserRqDTO userRqDto);

    UserRsDto toDto(UserEntity userEntity);
}
