package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GeocodeResponse {
    @JsonProperty("Response")
    private ResponseHere response;

    public ResponseHere getResponse() {
        return response;
    }

    public void setResponse(ResponseHere response) {
        this.response = response;
    }

    public PositionHere getFirsNavigationPosition() {
        if (response == null)
            return null;

        return response.getFirstNavigationPosition();
    }

    public LocationHere getFirstLocation() {
        if (response == null)
            return null;
        return response.getFirstLocation();
    }

    public boolean hasAnyLocation() {
        return getFirstLocation() != null;
    }
}
