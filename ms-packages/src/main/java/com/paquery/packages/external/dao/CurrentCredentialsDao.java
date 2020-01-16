package com.paquery.packages.external.dao;

import com.paquery.packages.external.domain.CurrentCredentials;
import com.paquery.packages.external.domain.ExternalServiceCredentials;
import com.paquery.packages.external.repositories.CurrentCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CurrentCredentialsDao {

    @Autowired
    private CurrentCredentialsRepository repository;

    public CurrentCredentials findByOnwer(ExternalServiceCredentials serviceCredentials) {

        Optional<CurrentCredentials> creds = repository.findByOwnerIDAndOwnerType(serviceCredentials.getOwnerID(), serviceCredentials.getOwnerType());

        if (creds.isPresent())
            return creds.get();

        return null;
    }

    public CurrentCredentials createOrUpdate(CurrentCredentials credentials) {

        Optional<CurrentCredentials> optCreds = repository.findByOwnerIDAndOwnerType(credentials.getOwnerID(), credentials.getOwnerType().getValue());

        CurrentCredentials credentialsToSave;

        if (optCreds.isPresent()) {
            credentialsToSave = optCreds.get();
            credentialsToSave.update(credentials);
        }
        else {
            credentialsToSave = credentials;
        }

        return repository.save(credentialsToSave);
    }


}
