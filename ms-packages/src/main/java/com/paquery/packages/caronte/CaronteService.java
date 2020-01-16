package com.paquery.packages.caronte;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.maps.response.PaqueryServiceResponse;
import com.paquery.packages.restTemplate.FactoryRestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class CaronteService {
    private static final Logger logger = LoggerFactory.getLogger(CaronteService.class);

    @Autowired
    private FactoryRestTemplate factoryRestTemplate;

    @Value("${paqueryServices.caronte}")
    private String CARONTE_URL;

    @Value("${caronte.admin.password}")
    private String caronteAdminPassword;

    @Value("${caronte.admin.username}")
    private String caronteAdminUsername;

    public void updateStatus(PaqueryPackage paqueryPackage) {

        Map payload = new HashMap<String, Object>();

        payload.put("id", paqueryPackage.getId());
        payload.put("externalCode", paqueryPackage.getExternalCode());
        payload.put("ownerID", paqueryPackage.getOwnerID());
        payload.put("ownerType", paqueryPackage.getOwnerType());
        payload.put("status", paqueryPackage.getStatus());

        HttpHeaders headers = new HttpHeaders();

        headers.add(HttpHeaders.AUTHORIZATION, getBasicCredentials());

        HttpEntity<Object> request = new HttpEntity<>(payload, headers);

        ResponseEntity<PaqueryServiceResponse<Map>> response;
        try {
            response = factoryRestTemplate.getRestTemplateFactory().
                    exchange(
                            String.format(CARONTE_URL + "paquery/package/%s/notifyChangeStatus", paqueryPackage.getId()),
                            HttpMethod.PUT,
                            request,
                            new ParameterizedTypeReference<PaqueryServiceResponse<Map>>() {
                            });

        } catch (ResourceAccessException | HttpClientErrorException e) {
            logger.error("error al consumir caronte: {} ", e.getMessage());
            return;
        }
        logger.info("respuesta de caronte: {} ", response.getStatusCode());
    }


    private String getBasicCredentials() {
        StringBuilder builder = new StringBuilder();

        builder.append(caronteAdminUsername).
                append(":").
                append(caronteAdminPassword);

        byte[] dataStr = builder.toString().getBytes();

        builder = new StringBuilder()
                .append("Basic ")
                .append(Base64.getEncoder().encodeToString(dataStr));

        return builder.toString();
    }
}
