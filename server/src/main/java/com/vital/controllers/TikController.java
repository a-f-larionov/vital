package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.TikDTO;
import com.vital.entities.TikEntity;
import com.vital.mappers.TikMapper;
import com.vital.repositories.TiksRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class TikController {

    final TiksRepository tiksRepository;
    final TikMapper tikMapper;

    @PostMapping("/api/tiks/add")
    public ResponseDTO tikAdd(@RequestBody @Valid TikDTO tikDto) {

        TikEntity entity = tikMapper.toEntity(tikDto);

        tiksRepository.save(entity);

        return new ResponseDTO("OK");
    }

}
