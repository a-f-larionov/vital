package com.vital.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.MetricaDTO;
import com.vital.mappers.MetricaMapper;
import com.vital.repositories.MetricaRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/metrica")
public class MetricaController {
    
    private final MetricaRepository metricaRepository; 
    private final MetricaMapper metricaMapper;

    @GetMapping("/list")
    public List<MetricaDTO> list(){

        var list = metricaRepository.findAll();

        return metricaMapper.toDto(list);
    }

}
