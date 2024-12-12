package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.MetricaEntity;

public interface MetricRepository extends PagingAndSortingRepository<MetricaEntity, String> {

    public List<MetricaEntity> findAll();

    public MetricaEntity findById(String id);
}
