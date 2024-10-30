package com.vital.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vital.dto.rs.MetricaTemplateRsDTO;
import com.vital.mappers.MetricaTemplateMapper;
import com.vital.repositories.MetricaTemplateRepository;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/metrica")
public class MetricaController {
    
    private final MetricaTemplateRepository metricaTemplateRepository; 
    private final MetricaTemplateMapper metricaTemplateMapper;

    @GetMapping("/list-templates")
    public List<MetricaTemplateRsDTO> listTemplates(){

        var list = metricaTemplateRepository.findAll();

        return metricaTemplateMapper.toDTO(list);
    }

}
