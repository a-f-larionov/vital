package com.vital.repositories;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vital.entities.UserEntity;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, String> {

    UserEntity getById(String id);

    Optional<UserEntity> getByGoogleEmail(String googleEmail);

    UserEntity save(UserEntity userEntity);
}
