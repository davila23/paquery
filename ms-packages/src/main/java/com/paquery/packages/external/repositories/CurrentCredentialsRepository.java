package com.paquery.packages.external.repositories;

import com.paquery.packages.external.domain.CurrentCredentials;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrentCredentialsRepository extends CrudRepository<CurrentCredentials, Long> {

    Optional<CurrentCredentials> findByOwnerIDAndOwnerType(Long ownerId, Integer OwnerType);

}
