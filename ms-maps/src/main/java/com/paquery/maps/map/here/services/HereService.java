package com.paquery.maps.map.here.services;

import com.paquery.maps.configuration.CacheConfiguration;
import com.paquery.maps.map.here.response.GeocodeResponse;
import com.paquery.maps.map.here.response.LocationHere;
import com.paquery.maps.map.here.response.PositionHere;
import com.paquery.maps.map.here.response.ResultSuggestions;
import com.paquery.maps.model.Coordenate;
import com.paquery.maps.restTemplate.FactoryRestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import static java.lang.String.format;

@Service
public class HereService {

    private final static Logger logger = LoggerFactory.getLogger(HereService.class);

    private static final String URL_GEOCODE = "https://geocoder.api.here.com/6.2/geocode.json?searchtext=%s&language=es&country=ARG&prox=%s&app_id=%s&app_code=%s";

    private static final String URL_AUTOCOMPLETE = "https://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=%s&language=es&country=ARG&app_id=%s&app_code=%s";

    @Value("${here.credentials.key}")
    private String API_KEY;

    @Value("${here.credentials.kode}")
    private String API_KODE;

    private static final String PROXIMITY_POINT_PAQUERY = "-34.601501,-58.425145";

    @Autowired
    private FactoryRestTemplate factoryRestTemplate;

    @Cacheable(cacheNames = CacheConfiguration.CACHE_HERE, unless = "#result == null")
    public Coordenate getLocationByAddress(String address) {
        logger.info("getLocationByAddress, address: {}", address);
        ResponseEntity<GeocodeResponse> response;
        try {
            response = factoryRestTemplate.getRestTemplateFactory().getForEntity(formatUrl(address), GeocodeResponse.class);
        }
        catch (Exception e) {
            return null;
        }

        if (response.getStatusCodeValue() != 200)
            return null;
        return getCoordenateByLatAndLog(response.getBody());
    }

    @Cacheable(cacheNames = CacheConfiguration.CACHE_HERE, unless = "#result == null")
    public LocationHere resolveLocationByAddress(String address) {
        logger.info("resolveLocationByAddress, address: %s", address);
        ResponseEntity<GeocodeResponse> responseAddress = factoryRestTemplate.getRestTemplateFactory().getForEntity(formatUrl(address), GeocodeResponse.class);
        if (responseAddress.getStatusCodeValue() != 200)
            return null;
        if (!responseAddress.getBody().hasAnyLocation())
            return new LocationHere();
        return responseAddress.getBody().getFirstLocation(); //responseAddress.getBody().getResponse().getView().get(0).getResult().get(0).getLocation();
    }

    @Cacheable(cacheNames = CacheConfiguration.CACHE_HERE, unless = "#result == null")
    public ResultSuggestions autocompleteAddress(String partialAddress) {
        logger.info("autocompleteAddress, address: %s", partialAddress);
        ResponseEntity<ResultSuggestions> autocomplete = factoryRestTemplate.getRestTemplateFactory().getForEntity(format(URL_AUTOCOMPLETE, partialAddress, API_KEY, API_KODE), ResultSuggestions.class);
        if (autocomplete.getStatusCodeValue() != 200)
            return null;
        return autocomplete.getBody();
    }


    private Coordenate getCoordenateByLatAndLog(GeocodeResponse response) {
        PositionHere navigationPosition = response.getFirsNavigationPosition(); //response.getResponse().getView().get(0).getResult().get(0).getLocation().getNavigationPosition().get(0);
        if (navigationPosition == null)
            return null;
        return new Coordenate(navigationPosition.getLatitude(), navigationPosition.getLongitude());
    }

    private String formatUrl(String address) {
        return format(URL_GEOCODE, address, PROXIMITY_POINT_PAQUERY, API_KEY, API_KODE);
    }
}
