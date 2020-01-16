package com.paquery.packages.external.services;

import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.external.domain.CurrentCredentials;
import com.paquery.packages.external.domain.ExternalServiceCredentials;
import com.paquery.packages.external.enums.CredentialsEnum;
import com.paquery.packages.external.exception.UnauthorizedExternalApiException;
import com.paquery.commons.utils.HttpUtil;
import com.paquery.commons.utils.JsonUtil;
import com.paquery.commons.utils.ParamUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class RequestExternalService {

    private static Logger logger = LoggerFactory.getLogger(RequestExternalService.class);

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private LoginExternalService loginExternalService;

    public Map checkCoupon(String coupon, ExternalServiceCredentials serviceCredentials) throws Exception {
        String url = serviceCredentials.getApiUrl() + "/check/";
        return sendRequest(url, coupon, serviceCredentials);
    }

    public Map redeemCoupon(String coupon, ExternalServiceCredentials serviceCredentials) throws Exception {
        String url = serviceCredentials.getApiUrl() + "/redeem/";
        return sendRequest(url, coupon, serviceCredentials);
    }

    private Map sendRequest(String url, String coupon, ExternalServiceCredentials serviceCredentials)  throws BusinessException, UnauthorizedExternalApiException  {

        CurrentCredentials credentials = loginExternalService.resolveCredentials(serviceCredentials);

        ResponseEntity responseEntity;

        try {
            responseEntity = makeHttpRequest(url, coupon, serviceCredentials, credentials);
        }
        catch(UnauthorizedExternalApiException e) {
            logger.info("Renovando credenciales de {} (idCreds={}) para API externa", serviceCredentials.getNameService(), serviceCredentials.getID());
            credentials = loginExternalService.renewCredentials(serviceCredentials);
            responseEntity = makeHttpRequest(url, coupon, serviceCredentials, credentials);
        }

        return HttpUtil.convertResponseToMap(responseEntity);
    }

    private ResponseEntity<String> makeHttpRequest(String url, String coupon, ExternalServiceCredentials serviceCredentials, CurrentCredentials credentials) throws BusinessException, UnauthorizedExternalApiException  {

        List<String> paramNames = ParamUtils.parseParams(serviceCredentials.getApiUrl());

        Map params = new HashMap();
        if (!paramNames.isEmpty())
            params.putAll(resolveParams(paramNames, credentials));
        else
            params.clear();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set(HttpHeaders.AUTHORIZATION, credentials.getTokenHeaderValue());

        HashMap bodyEntity = new HashMap();
        bodyEntity.put("codes", coupon);

        HttpEntity entity = new HttpEntity(HttpUtil.convertToUrlFormEncoded(bodyEntity), headers);

        ResponseEntity<String> response;
        try {
            response = restTemplate.postForEntity(url, entity, String.class, params);

            if (response.getStatusCode().equals(HttpStatus.UNAUTHORIZED))
                throw new UnauthorizedExternalApiException(
                        String.format("No es posible autenticarse con %s", serviceCredentials.getNameService())
                );
        }
        catch (RestClientException e) {
            throw new UnauthorizedExternalApiException(
                    String.format("No es posible autenticarse con %s", serviceCredentials.getNameService())
            );
        }

        return response;
    }


    private Map resolveParams(List<String> paramNames, CurrentCredentials credentials) {
        Map<String, String> params = new HashMap<>();

        if (credentials.getCredentialsType().equals(CredentialsEnum.TOKEN_JWT)) {
            JSONObject json = JsonUtil.parseBodyTokenJWT(credentials.getPayload());

            for ( String p : paramNames) {
                if (json.has(p)) {
                    params.put(p, json.get(p).toString());
                }
            }
        }

        return params;
    }

}
