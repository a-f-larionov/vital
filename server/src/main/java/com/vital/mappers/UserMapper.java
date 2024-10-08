package com.vital.mappers;

import org.mapstruct.Mapper;

import com.vital.dto.rq.UserRqDto;
import com.vital.dto.rs.UserRsDto;
import com.vital.entities.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity toEntity(UserRqDto userRqDto);

    UserRsDto toDto(UserEntity userEntity);

}
