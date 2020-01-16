package com.paquery.maps.dto;

import com.paquery.maps.domain.ShippingAddress;

import java.util.Date;

public class ShippingAddressDto {

    private Long id;

    private String addressDetail;

    private Date creationDate;

    private Boolean active;

    private Boolean deleted;

    private Double lng;

    private Double lat;

    private String addressType;

    private String name;

    private String comment;

    public ShippingAddressDto(ShippingAddress address) {
        this.id = address.getId();
        this.addressDetail = address.getAddressDetail();
        this.creationDate = address.getCreationDate();
        this.active = address.getActive();
        this.deleted = address.getDeleted();
        this.lng = address.getLng();
        this.lat = address.getLat();
        this.addressType = address.getAddressType();
        this.name = address.getName();
        this.comment = address.getComment();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
