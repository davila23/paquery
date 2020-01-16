package com.paquery.packages.restTemplate;

import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FactoryRestTemplate {

    private static final int TIMEOUT = 25000;

    private ClientHttpRequestFactory getClientHttpRequestFactory() {
        HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        clientHttpRequestFactory.setConnectTimeout(TIMEOUT);
        return clientHttpRequestFactory;
    }

    public RestTemplate getRestTemplateFactory() {
        return new RestTemplate(getClientHttpRequestFactory());
    }
}
