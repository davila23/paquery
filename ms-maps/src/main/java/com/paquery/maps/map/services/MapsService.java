package com.paquery.maps.map.services;

import com.paquery.maps.dto.location.LocationAddress;
import com.paquery.maps.map.here.response.LocationHere;
import com.paquery.maps.map.here.response.ResultSuggestions;
import com.paquery.maps.map.here.services.HereService;
import com.paquery.maps.model.Coordenate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapsService implements IMapAddressService {

    @Autowired
    private HereService hereService;

    public Coordenate resolveCoordenatesByAddress(String addressDetail) {
        return hereService.getLocationByAddress(addressDetail);
    }

    public LocationHere validateAddress(String address) {
        return hereService.resolveLocationByAddress(address);
    }
    public ResultSuggestions autocompleteAddress(String partialAddress){
        return hereService.autocompleteAddress(partialAddress);
    }

    @Override
    public LocationAddress resolveLocation(String address) {
        LocationHere locationHere = validateAddress(address);

        if (locationHere != null)
            return locationHere.toLocationAddress();

        return null;
    }
}
