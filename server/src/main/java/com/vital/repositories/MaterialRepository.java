package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.MaterialEntity;

public interface MaterialRepository extends PagingAndSortingRepository<MaterialEntity, String> {

    List<MaterialEntity> findByUidAndIsArchivedFalse(String uid);

    MaterialEntity findById(String id);

    void save(MaterialEntity materialEntity);
}
