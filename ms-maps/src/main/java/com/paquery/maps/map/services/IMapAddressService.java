package com.paquery.maps.map.services;

import com.paquery.maps.dto.location.LocationAddress;

public interface IMapAddressService {
    LocationAddress resolveLocation(String address);
}
