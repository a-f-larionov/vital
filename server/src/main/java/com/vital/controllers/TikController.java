package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.TikDTO;
import com.vital.entities.TikEntity;
import com.vital.mappers.TikMapper;
import com.vital.repositories.TaskRepository;
import com.vital.repositories.TiksRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tiks")
public class TikController {

    final TaskRepository taskRepository;
    final TiksRepository tiksRepository;
    final TikMapper tikMapper;

    @PostMapping("/add")
    public ResponseDTO tikAdd(@RequestBody @Valid TikDTO tikDto) {

        taskRepository.setTikLastUpdate(tikDto.getDatetime(), tikDto.getTid());

        TikEntity entity = tikMapper.toEntity(tikDto);

        tiksRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid TikDTO tikDto) {
        var entity = tiksRepository.findByUidAndId(tikDto.getUid(), tikDto.getId());
        entity.setIsArchived(true);
        tiksRepository.save(entity);
        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TikDTO taskDto) {

        var entity = tikMapper.toEntity(taskDto);

        tiksRepository.save(entity);

        return new ResponseDTO("OK");
    }

}
