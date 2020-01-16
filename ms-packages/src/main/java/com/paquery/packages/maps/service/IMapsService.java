package com.paquery.packages.maps.service;

import com.paquery.packages.maps.response.W3wResponse;

public interface IMapsService {

    W3wResponse getW3wInfoByAddress(String address);
}
