package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.entities.CommentEntity;
import com.vital.mappers.CommentMapper;
import com.vital.mappers.CommentRqDTO;
import com.vital.repositories.CommentRepository;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/comments/")
public class CommentController {

    final CommentRepository commentRepository;
    final CommentMapper commentMapper;

    @PostMapping("/add")
    public ResponseDTO tikAdd(@RequestBody @Valid CommentRqDTO tikDto) {

        CommentEntity entity = commentMapper.toEntity(tikDto);

        commentRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid CommentRqDTO tikDto) {
        var entity = commentRepository.findByUidAndId(tikDto.getUid(), tikDto.getId());
        entity.setIsArchived(true);
        commentRepository.save(entity);
        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid CommentRqDTO taskDto) {

        var entity = commentMapper.toEntity(taskDto);

        commentRepository.save(entity);

        return new ResponseDTO("OK");
    }

}
