package com.vital.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TikEntity;

public interface TiksRepository extends PagingAndSortingRepository<TikEntity, String> {

    public void save(TikEntity entity); 

    public List<TikEntity> findAllByUid(String uid);

    public List<TikEntity> findAllByUidAndIsArchivedFalse(String uid);

    public List<TikEntity> findAllByUidAndTidAndMidAndDatetimeAfterAndIsArchivedFalse(
            String uid,
            String tid,
            String mid,
            Instant datetime);

    public TikEntity findByUidAndId(String uid, String id);
}
