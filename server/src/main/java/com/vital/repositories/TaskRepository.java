package com.vital.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TaskEntity;

import jakarta.transaction.Transactional;

public interface TaskRepository extends PagingAndSortingRepository<TaskEntity, String> {

    void save(TaskEntity entity);

    List<TaskEntity> findByUidAndIsArchivedFalse(String uid);

    TaskEntity findByUidAndId(String uid, String id);

    void deleteByUidAndId(String uid, String id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update task_entity set tik_last_update = ? WHERE id = ?")
    void setTikLastUpdate(Instant tikLastUpdate, String taskId);
}
