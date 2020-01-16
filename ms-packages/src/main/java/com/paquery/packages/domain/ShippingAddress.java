package com.paquery.packages.domain;

import com.paquery.commons.dto.ShippingAddressDto;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "PQ_ShippingAddress")
public class ShippingAddress {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "AddressDetail")
    private String addressDetail;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "Lng")
    private Double lng;

    @Column(name = "Lat")
    private Double lat;

    @Column(name = "AddressType")
    private Integer addressType;

    @Column(name = "Name")
    private String name;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "GeoKey")
    private String geoKey;

    @Column(name = "UserID")
    private Long userID;

    @Column(name = "Show")
    private Boolean show;

    public ShippingAddress(ShippingAddressDto shippingAddressDto) {
        this.addressDetail = shippingAddressDto.getAddressDetail();
        this.creationDate = shippingAddressDto.getCreationDate() != null ? LocalDateTime.from(shippingAddressDto.getCreationDate()) : shippingAddressDto.getCreationDate();
        this.comment = shippingAddressDto.getComment();
        this.lng = shippingAddressDto.getLng();
        this.lat = shippingAddressDto.getLat();
        this.geoKey = shippingAddressDto.getGeoKey();
        this.name = shippingAddressDto.getName();
    }

    public ShippingAddress() {
    }

    public void updateShippingAddress(ShippingAddressDto shippingAddressDto) {
        this.comment = shippingAddressDto.getComment();
        this.geoKey = shippingAddressDto.getGeoKey();
        this.addressDetail = shippingAddressDto.getAddressDetail();
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

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
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

    public Integer getAddressType() {
        return addressType;
    }

    public void setAddressType(Integer addressType) {
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

    public String getGeoKey() {
        return geoKey;
    }

    public void setGeoKey(String geoKey) {
        this.geoKey = geoKey;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public Boolean getShow() {
        return show;
    }

    public void setShow(Boolean show) {
        this.show = show;
    }
}
