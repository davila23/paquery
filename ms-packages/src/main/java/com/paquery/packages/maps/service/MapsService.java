package com.paquery.packages.maps.service;

import com.paquery.packages.domain.DistributionZone;
import com.paquery.packages.maps.response.PaqueryServiceResponse;
import com.paquery.packages.maps.response.W3wResponse;
import com.paquery.packages.restTemplate.FactoryRestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;

@Service
public class MapsService implements IMapsService {

    private static final Logger logger = LoggerFactory.getLogger(MapsService.class);

    @Autowired
    private FactoryRestTemplate factoryRestTemplate;

    private String URL_W3W_BY_ADDRESS = "w3w/address?address=%s";

    private String URL_DISTRIBUTION_ZONE = "zones/resolveDistributionZone?address=%s";

    @Value("${paqueryServices.maps}")
    private String MAP_SERVICE_URL;

    public W3wResponse getW3wInfoByAddress(String address) {
        ResponseEntity<PaqueryServiceResponse<W3wResponse>> response;
        try {
            response = factoryRestTemplate.getRestTemplateFactory().
                    exchange(
                            String.format(MAP_SERVICE_URL.concat(URL_W3W_BY_ADDRESS), address),
                            HttpMethod.GET,
                            null,
                            new ParameterizedTypeReference<PaqueryServiceResponse<W3wResponse>>() {
                            });
        } catch (ResourceAccessException | HttpClientErrorException e) {
            logger.error("Error al consumir el servicio W3W de Mapas. Causa: " + e.getCause()
                    + " , Mensaje: " + e.getMessage());
            return null;
        }
        if (response.getStatusCodeValue() != 200) {
            logger.error("Error al consumir el servicio W3W de Mapas. Status: " + response.getStatusCodeValue()
                    + " , Mensaje: " + response.getBody().getMessage());
            return null;
        }

        return response.getBody().

                getData();

    }

    public DistributionZone resolveDistributionZoneByAddress(String address) {

        ResponseEntity<PaqueryServiceResponse<DistributionZone>> response;
        try {
            response = factoryRestTemplate.getRestTemplateFactory().
                    exchange(
                            String.format(MAP_SERVICE_URL.concat(URL_DISTRIBUTION_ZONE), address),
                            HttpMethod.GET,
                            null,
                            new ParameterizedTypeReference<PaqueryServiceResponse<DistributionZone>>() {
                            });
        } catch (ResourceAccessException | HttpClientErrorException e) {
            logger.error("Error al  resolver las zonas, en ms-maps. Causa: " + e.getCause()
                    + " , Mensaje: " + e.getMessage());
            return null;

        }

        if (response.getStatusCodeValue() != 200) {
            logger.error("Error al  resolver las zonas, en ms-maps. Status: " + response.getStatusCodeValue()
                    + " , Mensaje: " + response.getBody().getMessage());
            return null;
        }
        return response.getBody().

                getData();
    }
}
