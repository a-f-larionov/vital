package com.vital.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.rs.MetricTemplateRsDTO;
import com.vital.mappers.MetricTemplateMapper;
import com.vital.repositories.MetricTemplateRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/metric")
public class MetricController {
    
    private final MetricTemplateRepository metricaTemplateRepository; 
    private final MetricTemplateMapper metricaTemplateMapper;

    @GetMapping("/list-templates")
    public List<MetricTemplateRsDTO> listTemplates(){

        var list = metricaTemplateRepository.findAll();

        return metricaTemplateMapper.toDTO(list);
    }

}
