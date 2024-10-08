package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.rq.UserRqDto;
import com.vital.dto.rs.UserRsDto;
import com.vital.entities.UserEntity;
import com.vital.mappers.UserMapper;
import com.vital.repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    final UserRepository userRepository;
    final UserMapper userMapper;

    @PostMapping("/register")
    public UserRsDto register(@RequestBody UserRqDto userRqDto) {

        UserEntity userEntity;

        userEntity = userRepository.getByGoogleEmail(userRqDto.getGoogleEmail());

        if (userEntity == null) {
            userEntity = userMapper.toEntity(userRqDto);
            userRepository.save(userEntity);
        }

        return userMapper.toDto(userEntity);
    }
}
