package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TikEntity;

public interface TiksRepository extends PagingAndSortingRepository<TikEntity, String> {

    public void save(TikEntity entity);

    public List<TikEntity> findAll();
    // increment by tid and dt

    // find by tid and beforeef dt: tid dt times, m1,m2,m3,m4

    // sum week by tid: tid, times, m1,m2,m3,m4
    // sum month by tid: tid, times, m1,m2,m3,m4
    // sum thisYear tid: tid, times, m1,m2,m3,m4

}
