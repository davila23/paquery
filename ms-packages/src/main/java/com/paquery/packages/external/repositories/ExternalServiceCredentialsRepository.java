package com.paquery.packages.external.repositories;

import com.paquery.packages.external.domain.ExternalServiceCredentials;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExternalServiceCredentialsRepository extends CrudRepository<ExternalServiceCredentials, Long> {

    Optional<ExternalServiceCredentials> findByOwnerIDAndOwnerType(Long ownerId, Integer ownerType);

}
