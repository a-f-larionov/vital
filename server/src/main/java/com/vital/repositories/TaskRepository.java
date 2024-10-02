package com.vital.repositories;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TaskEntity;

public interface TaskRepository extends PagingAndSortingRepository<TaskEntity, String> {

    public void save(TaskEntity entity);

    public List<TaskEntity> findByIsArchivedFalse();

    public TaskEntity findById(String id);

    public void deleteById(String id);
}
