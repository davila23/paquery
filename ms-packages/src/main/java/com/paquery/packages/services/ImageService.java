package com.paquery.packages.services;

import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.restTemplate.FactoryRestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.ResourceAccessException;

@Service
public class ImageService {

    @Autowired
    private FactoryRestTemplate factoryRestTemplate;

    @Value("${paquery.apiUrl}")
    public String API_URL;

    private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

    public String setAtributtesAndSendFile(String folder, String file) throws BusinessException {

        String name = createFileName();

        sendFile(folder, name, file);

        return name;
    }

    private String createFileName() {
        return System.currentTimeMillis() + ".jpg";
    }


    private void sendFile(String folder, String name, String file) throws BusinessException {
        ResponseEntity<String> response;
        try {
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            body.add("folder", folder);
            body.add("name", name);
            body.add("file", file);

            response = factoryRestTemplate.getRestTemplateFactory().postForEntity(API_URL + "/api/packageadmin/savefile", body, String.class);


        } catch (ResourceAccessException e) {
            logger.error("Error al consumir API, Causa: " + e.getCause()
                    + " , Mensaje: " + e.getMessage());
            throw new BusinessException("Error al consumir La api de Paquery: " + e.getMessage());
        }


        if (response.getStatusCodeValue() != 200) {
            logger.error("Error al consumir API, Status: " + response.getStatusCodeValue()
                    + " , Mensaje: " + response);
            throw new BusinessException("Error al consumir La api de Paquery: " + response.getStatusCode());
        }
    }
}
