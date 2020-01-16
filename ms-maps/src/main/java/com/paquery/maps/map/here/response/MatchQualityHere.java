package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class MatchQualityHere {

    @JsonProperty(value = "Country")
    private Long country;

    @JsonProperty(value = "HouseNumber")
    private Long houseNumber;

    @JsonProperty(value = "Street")
    private List<Long> street;

    public Long getCountry() {
        return country;
    }

    public void setCountry(Long country) {
        this.country = country;
    }

    public Long getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(Long houseNumber) {
        this.houseNumber = houseNumber;
    }

    public List<Long> getStreet() {
        return street;
    }

    public void setStreet(List<Long> street) {
        this.street = street;
    }
}
