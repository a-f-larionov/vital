package com.vital.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TaskEntity;

public interface TaskRepository extends PagingAndSortingRepository<TaskEntity, String> {

    void save(TaskEntity entity);

    List<TaskEntity> findByUidAndIsArchivedFalse(String uid);

    TaskEntity findByUidAndId(String uid, String id);

    void deleteByUidAndId(String uid, String id);

    @Modifying
    @Query(nativeQuery = true, value = "update task_entity set tik_last_update = (select MAX(datetime) from tik_entity WHERE tid = :taskId) where id = :taskId")
    void setTikLastUpdate(String taskId);
}
