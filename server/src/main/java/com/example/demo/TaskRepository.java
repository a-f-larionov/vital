package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface TaskRepository extends PagingAndSortingRepository<TaskEntity, String> {

    public void save(TaskEntity entity);

    public List<TaskEntity> findAll();

    // @Modifying
    // @Query(value = "delete from task_entity where id = :id", nativeQuery = true)
    public void deleteById (String id);

    /**
     * @Modifying
@Query("delete from Book b where b.title=:title")
void deleteBooks(@Param("title") String title);
     */
}
