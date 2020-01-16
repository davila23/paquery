package com.paquery.packages.external.services;

import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.external.dao.CurrentCredentialsDao;
import com.paquery.packages.external.domain.CurrentCredentials;
import com.paquery.packages.external.domain.ExternalServiceCredentials;
import com.paquery.packages.external.enums.LoginFlowEnum;
import com.paquery.commons.utils.HttpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginExternalService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CurrentCredentialsDao currentCredentialsDao;

    private Map<LoginFlowEnum, LoginExternalStrategy> loginStrategies;

    @PostConstruct
    void init() {

        loginStrategies = new HashMap<>();

        loginStrategies.put(LoginFlowEnum.COMMON, credentials -> {

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));

            Map bodyMap = new HashMap();
            bodyMap.put("username", credentials.getUsername());
            bodyMap.put("password", credentials.getPassword());
            String bodyRequest = HttpUtil.convertToUrlFormEncoded(bodyMap);

            HttpEntity httpEntity = new HttpEntity(bodyRequest, headers);

            ResponseEntity<String> responseLogin = restTemplate.postForEntity(credentials.getLoginUrl(), httpEntity, String.class);

            if (responseLogin.getStatusCode().equals(HttpStatus.OK)) {
                CurrentCredentials currentCredentials = new CurrentCredentials(credentials, responseLogin.getBody());
                currentCredentialsDao.createOrUpdate(currentCredentials);
                return currentCredentials;
            }

            return null;
        });
    }

    public CurrentCredentials resolveCredentials(ExternalServiceCredentials externalCredentials) throws BusinessException {
        CurrentCredentials credentials = currentCredentialsDao.findByOnwer(externalCredentials);

        if (credentials != null && credentials.isValid()) {
            return credentials;
        }

        return renewCredentials(externalCredentials);
    }

    public CurrentCredentials renewCredentials(ExternalServiceCredentials externalCredentials) throws BusinessException {

        LoginExternalStrategy strategyLogin = loginStrategies.getOrDefault(externalCredentials.getLoginFlowType(), null);

        if (strategyLogin == null)
            throw new BusinessException(String.format("No hay esquema de Login para OwnerID: %s y OwnerType: %d", externalCredentials.getOwnerID(), externalCredentials.getOwnerType()));

        return strategyLogin.doLogin(externalCredentials);
    }

}
