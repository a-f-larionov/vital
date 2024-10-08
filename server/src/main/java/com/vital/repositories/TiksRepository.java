package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TikEntity;

public interface TiksRepository extends PagingAndSortingRepository<TikEntity, String> {

    public void save(TikEntity entity);

    public List<TikEntity> findAllByUid(String uid);
}
