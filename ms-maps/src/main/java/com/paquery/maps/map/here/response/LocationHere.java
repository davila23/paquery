package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.paquery.maps.dto.location.LocationAddress;

import java.util.List;

public class LocationHere {

    @JsonProperty(value = "LocationId")
    private String locationId;

    @JsonProperty(value = "LocationType")
    private String locationType;

    @JsonProperty(value = "Address")
    private AddressHere address;

    @JsonProperty(value = "NavigationPosition")
    private List<PositionHere> navigationPosition;

    @JsonProperty(value = "MapView")
    private MapViewHere mapView;

    @JsonProperty(value = "DisplayPosition")
    private PositionHere displayPosition;


    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getLocationType() {
        return locationType;
    }

    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }

    public AddressHere getAddress() {
        return address;
    }

    public void setAddress(AddressHere address) {
        this.address = address;
    }

    public List<PositionHere> getNavigationPosition() {
        return navigationPosition;
    }

    public void setNavigationPostion(List<PositionHere> navigationPosition) {
        this.navigationPosition = navigationPosition;
    }

    public MapViewHere getMapView() {
        return mapView;
    }

    public void setMapView(MapViewHere mapView) {
        this.mapView = mapView;
    }

    public void setNavigationPosition(List<PositionHere> navigationPosition) {
        this.navigationPosition = navigationPosition;
    }

    public PositionHere getDisplayPosition() {
        return displayPosition;
    }

    public void setDisplayPosition(PositionHere displayPosition) {
        this.displayPosition = displayPosition;
    }

    public LocationAddress toLocationAddress() {

        LocationAddress locationAddress = new LocationAddress();

        locationAddress.setLabel(this.address.getLabel());

        locationAddress.setCountry(this.address.getCountry());
        locationAddress.setState(this.address.getState());
        locationAddress.setCity(this.address.getCity());
        locationAddress.setCounty(this.address.getCounty());
        locationAddress.setDistrict(this.address.getDistrict());

        locationAddress.setHouseNumber(this.address.getHouseNumber());
        locationAddress.setStreet(this.address.getStreet());

        locationAddress.setPostalCode(this.address.getPostalCode());

        // Parametros de geolocalizacion
        locationAddress.setLatitude(this.displayPosition.getLatitude());
        locationAddress.setLongitude(this.displayPosition.getLongitude());

        return locationAddress;
    }

    public PositionHere getFirstNavigationPosition() {
        if (navigationPosition != null && !navigationPosition.isEmpty()) {
            return navigationPosition.get(0);
        }

        return null;
    }
}
