package com.vital.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TikEntity;

public interface TiksRepository extends PagingAndSortingRepository<TikEntity, String> {

    public void save(TikEntity entity);

    @Query(nativeQuery = true, value =
     "SELECT MAX(id) as id, tid, date_trunc('day', datetime) as datetime, sum(times) as times,sum(seconds) as seconds, SUM(m1) as m1, SUM(m2) as m2, SUM(m3) as m3, SUM(m4) as m4 FROM tik_entity group by tid, date_trunc('day', datetime)")
    public List<TikEntity> findAll();
    // increment by tid and dt

    // find by tid and before dt: tid dt times, m1,m2,m3,m4

    // sum week by tid: tid, times, m1,m2,m3,m4
    // sum month by tid: tid, times, m1,m2,m3,m4
    // sum thisYear tid: tid, times, m1,m2,m3,m4

}
