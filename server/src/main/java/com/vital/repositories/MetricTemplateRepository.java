package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.MetricaTemplateEntity;

public interface MetricTemplateRepository extends PagingAndSortingRepository<MetricaTemplateEntity, String> {

    public List<MetricaTemplateEntity> findAll();

    public MetricTemplateRepository findById(String id);
}
