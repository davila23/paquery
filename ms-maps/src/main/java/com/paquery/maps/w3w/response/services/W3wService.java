package com.paquery.maps.w3w.response.services;

import com.paquery.maps.configuration.CacheConfiguration;
import com.paquery.maps.map.here.response.LocationHere;
import com.paquery.maps.map.here.services.HereService;
import com.paquery.maps.map.services.MapsService;
import com.paquery.maps.restTemplate.FactoryRestTemplate;
import com.paquery.maps.w3w.response.W3wResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class W3wService {

    private final static Logger logger = LoggerFactory.getLogger(HereService.class);

    @Autowired
    private FactoryRestTemplate factoryRestTemplate;

    private static final String URL_COORDS = "reverse?coords";

    private static final String URL_ADDRESS = "forward?addr";

    private static String BASE_URL_W3W = "https://api.what3words.com/v2/%s=%s&display=full&format=json&key=%s&lang=es";

    @Value("${w3w.key}")
    private String W3W_API_KEY;

    @Autowired
    private MapsService mapsService;

    @Cacheable(cacheNames = CacheConfiguration.CACHE_W3W)
    public W3wResponse getW3wByCoords(String address) {

        LocationHere locationHere = mapsService.validateAddress(address);
        if (locationHere == null || locationHere.getDisplayPosition() == null)
            throw new EntityNotFoundException("Direccion invalida: " + address);

        return getW3w(locationHere.getDisplayPosition().getLatitude() + "," +
                locationHere.getDisplayPosition().getLongitude(), URL_COORDS);
    }

    @Cacheable(cacheNames = CacheConfiguration.CACHE_W3W)
    public W3wResponse getW3wByWords(String words) {
        return getW3w(words, URL_ADDRESS);
    }

    @Cacheable(cacheNames = CacheConfiguration.CACHE_W3W)
    public W3wResponse getW3wByGeo(Double lat, Double lng) {
        return getW3w(lat + "," + lng, URL_COORDS);
    }

    private W3wResponse getW3w(String data, String url) {
        logger.info("consumiendo servicio W3W: data: %s, url: %s", data, url);
        ResponseEntity<W3wResponse> response = factoryRestTemplate.getRestTemplateFactory().getForEntity(
                String.format(BASE_URL_W3W,
                        url,
                        data,
                        W3W_API_KEY)
                , W3wResponse.class);
        if (response.getStatusCodeValue() != 200)
            throw new EntityNotFoundException("Fallo la comunicacion con el servidor W3W");
        return response.getBody();
    }
}
