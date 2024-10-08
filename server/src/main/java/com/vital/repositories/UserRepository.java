package com.vital.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.UserEntity;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, String> {

    UserEntity getById(String id);

    UserEntity getByGoogleEmail(String googleEmail);

    void save(UserEntity userEntity);
}
