package com.paquery.maps.map.here.response;

public class Suggestions {

    private String label;

    private String language;

    private String countryCode;

    private String locationId;

    private AddressHere address;

    private String matchLevel;

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getLocationId() {
        return locationId;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public AddressHere getAddress() {
        return address;
    }

    public void setAddress(AddressHere address) {
        this.address = address;
    }

    public String getMatchLevel() {
        return matchLevel;
    }

    public void setMatchLevel(String matchLevel) {
        this.matchLevel = matchLevel;
    }
}
