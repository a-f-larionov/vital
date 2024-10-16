package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.rq.UserRqDto;
import com.vital.dto.rs.UserRsDto;
import com.vital.mappers.UserMapper;
import com.vital.repositories.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping(value = "/api/users")
public class UserController {

    final UserRepository userRepository;
    final UserMapper userMapper;

    @PostMapping("/register/google")
    public UserRsDto registerGoogle(@RequestBody UserRqDto userRqDto) {
        // prevent bug where email case different: john@gmail.com and John@gmail.com
        userRqDto.setGoogleEmail(userRqDto.getGoogleEmail().toLowerCase());

        return userMapper.toDto(
                userRepository
                        .getByGoogleEmail(userRqDto.getGoogleEmail())
                        .orElseGet(() -> 
                             userRepository.save(
                                    userMapper.toEntity(userRqDto))
                        ));
    }
}
