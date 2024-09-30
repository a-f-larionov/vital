package com.vital.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.TaskDaysEntity;

public interface TaskDaysRepository extends PagingAndSortingRepository<TaskDaysEntity, String> {

    // increment by tid and dt

    // find by tid and before dt: tid dt times, m1,m2,m3,m4

    // sum week by tid: tid, times, m1,m2,m3,m4
    // sum month by tid: tid, times, m1,m2,m3,m4
    // sum thisYear tid: tid, times, m1,m2,m3,m4

    

}
