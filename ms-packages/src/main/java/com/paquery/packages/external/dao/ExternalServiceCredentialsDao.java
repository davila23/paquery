package com.paquery.packages.external.dao;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.external.domain.ExternalServiceCredentials;
import com.paquery.packages.external.dto.ExternalServiceDto;
import com.paquery.packages.external.repositories.ExternalServiceCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ExternalServiceCredentialsDao {

    @Autowired
    private ExternalServiceCredentialsRepository repository;


    public ExternalServiceCredentials findCredentialsByOwner(PaqueryPackage paqueryPackage) {
        if (!paqueryPackage.hasOwner())
            return null;

        Optional<ExternalServiceCredentials> credentials = repository.findByOwnerIDAndOwnerType(
                paqueryPackage.getOwnerID(),
                paqueryPackage.getOwnerType().getValue()
        );
        return credentials.orElse(null);
    }

    public ExternalServiceCredentials create(ExternalServiceDto credentialsDto) {
        ExternalServiceCredentials serviceCredentials = new ExternalServiceCredentials(credentialsDto);
        return repository.save(serviceCredentials);
    }

}
