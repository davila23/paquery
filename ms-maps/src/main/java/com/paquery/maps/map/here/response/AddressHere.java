package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.List;

public class AddressHere {

    @JsonAlias({"county", "County"})
    private String county;

    @JsonAlias({"country", "Country"})
    private String country;

    @JsonAlias({"houseNumber", "HouseNumber"})
    private String houseNumber;

    @JsonAlias({"label", "Label"})
    private String label;

    @JsonAlias({"street", "Street"})
    private String street;

    @JsonAlias({"state", "State"})
    private String state;

    @JsonAlias({"District", "district"})
    private String district;

    @JsonAlias({"postalCode", "PostalCode"})
    private String postalCode;

    @JsonAlias({"City", "city"})
    private String city;

    @JsonAlias({"additionalData", "AdditionalData"})
    private List<AdditionalDataHere> additionalData;


    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public List<AdditionalDataHere> getAdditionalData() {
        return additionalData;
    }

    public void setAdditionalData(List<AdditionalDataHere> additionalData) {
        this.additionalData = additionalData;
    }
}
