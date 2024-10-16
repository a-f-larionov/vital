package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.CommentEntity;

public interface CommentRepository extends PagingAndSortingRepository<CommentEntity, String> {

    public void save(CommentEntity entity);

    public CommentEntity findByUidAndId(String uid, String id);
    
    public List<CommentEntity> findAllByUid(String uid);
    
    public List<CommentEntity> findAllByUidAndIsArchivedFalse(String uid);
}
