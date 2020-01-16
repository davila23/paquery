package com.paquery.packages.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Table(name = "PQ_Geolocation")
public class Geolocation {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "Detail")
    private String detail;

    @Column(name = "GeoKey")
    private String geoKey;

    @Column(name = "Lat")
    private Double lat;

    @Column(name = "Lng")
    private Double lng;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @Column(name = "GeoLocationType")
    private Integer geoLocationType;

    @Column(name = "ObjectID")
    private Integer objectID;

    @Column(name = "CityID")
    private Long cityID;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getGeoKey() {
        return geoKey;
    }

    public void setGeoKey(String geoKey) {
        this.geoKey = geoKey;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getGeoLocationType() {
        return geoLocationType;
    }

    public void setGeoLocationType(Integer geoLocationType) {
        this.geoLocationType = geoLocationType;
    }

    public Integer getObjectID() {
        return objectID;
    }

    public void setObjectID(Integer objectID) {
        this.objectID = objectID;
    }

    public Long getCityID() {
        return cityID;
    }

    public void setCityID(Long cityID) {
        this.cityID = cityID;
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
}
