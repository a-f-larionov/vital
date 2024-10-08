package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TaskEntity;

public interface TaskRepository extends PagingAndSortingRepository<TaskEntity, String> {

    public void save(TaskEntity entity);

    public List<TaskEntity> findByUidAndIsArchivedFalse(String uid);

    public TaskEntity findByUidAndId(String uid, String id);

    public void deleteByUidAndId(String uid, String id);
}
