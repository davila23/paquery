package com.paquery.packages.external.services;

import com.paquery.packages.external.domain.CurrentCredentials;
import com.paquery.packages.external.domain.ExternalServiceCredentials;

@FunctionalInterface
public interface LoginExternalStrategy {

    CurrentCredentials doLogin(ExternalServiceCredentials credentials);

}
