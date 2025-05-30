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

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/tiks")
@Transactional
public class TikController {

    final TaskRepository taskRepository;
    final TiksRepository tiksRepository;
    final TikMapper tikMapper;

    @PostMapping("/add")
    public ResponseDTO tikAdd(@RequestBody @Valid TikDTO tikDto) {

        TikEntity entity = tikMapper.toEntity(tikDto);
        tiksRepository.save(entity);

        taskRepository.setTikLastUpdate(tikDto.getTid());

        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid TikDTO tikDto) {
        var entity = tiksRepository.findByUidAndId(tikDto.getUid(), tikDto.getId());
        entity.setIsArchived(true);
        tiksRepository.save(entity);

        taskRepository.setTikLastUpdate(tikDto.getTid());

        return new ResponseDTO("OK");
    }

    @PostMapping("/undo")
    public ResponseDTO undo(@RequestBody @Valid TikDTO tikDto) {
        tiksRepository.deleteById(tikDto.getId());

        taskRepository.setTikLastUpdate(tikDto.getTid());

        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid TikDTO tikDto) {

        var entity = tikMapper.toEntity(tikDto);

        tiksRepository.save(entity);

        taskRepository.setTikLastUpdate(tikDto.getTid());

        return new ResponseDTO("OK");
    }

}
