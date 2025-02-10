package com.vital.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.ResponseDTO;
import com.vital.dto.rq.MaterialListRqDto;
import com.vital.dto.rq.MaterialRqDTO;
import com.vital.dto.rs.MaterialRsDTO;
import com.vital.entities.MaterialEntity;
import com.vital.mappers.MaterialMapper;
import com.vital.repositories.MaterialRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/materials")
@Transactional
public class MaterialController {

    private final MaterialRepository materialRepository;
    private final MaterialMapper materialMapper;

    @GetMapping("/")
    public List<MaterialRsDTO> getByTaskId(@RequestParam String taskId) {
        var rsDto = new MaterialRsDTO();

        return List.of(rsDto);
    }

    @PostMapping("/list")
    public List<MaterialRsDTO> list(@RequestBody @Valid MaterialListRqDto materialListRqDto) {

        List<MaterialEntity> materials = materialRepository.findByUidAndIsArchivedFalse(materialListRqDto.getUid());

        return materials.stream()
                .map(materialMapper::toDTO)
                .toList();
    }

    @PostMapping("/add2")
    public ResponseDTO add2(){
        return new ResponseDTO("Ok");
    }

    @PostMapping("/add")
    public ResponseDTO add(@RequestBody @Valid MaterialRqDTO materialRqDTO) {

        var materialEntity = materialMapper.toEntity(materialRqDTO);

        materialRepository.save(materialEntity);

        return new ResponseDTO("Ok");
    }

    @PostMapping("/update")
    public ResponseDTO update(@RequestBody @Valid MaterialRqDTO materialRqDTO) {
        var current = materialRepository.findById(materialRqDTO.getId());

        materialMapper.mergeToUpdate(current, materialRqDTO);

        materialRepository.save(current);

        return new ResponseDTO("Ok");
    }
}
