package com.vital.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.rq.CommentRqDTO;
import com.vital.entities.CommentEntity;
import com.vital.mappers.CommentMapper;
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
    public ResponseDTO tikAdd(@RequestBody @Valid CommentRqDTO tikDTO){

        CommentEntity entity = commentMapper.toEntity(tikDTO);

        commentRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/archive")
    public ResponseDTO archive(@RequestBody @Valid CommentRqDTO tikDTO) {
        var entity = commentRepository.findByUidAndId(tikDTO.getUid(), tikDTO.getId());
        entity.setIsArchived(true);
        commentRepository.save(entity);

        return new ResponseDTO("OK");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid CommentRqDTO taskDTO) {

        var entity = commentMapper.toEntity(taskDTO);
        commentRepository.save(entity);

        return new ResponseDTO("OK");
    }

}
