package com.paquery.maps.services;

import com.paquery.maps.map.here.response.LocationHere;
import com.paquery.maps.map.here.response.ResultSuggestions;
import com.paquery.maps.map.services.MapsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private MapsService mapsService;

    public LocationHere validateAddress(String address) {
        return mapsService.validateAddress(address);
    }

    public ResultSuggestions autocompleteAddress(String partialAddress) {
        return mapsService.autocompleteAddress(partialAddress);
    }
}
