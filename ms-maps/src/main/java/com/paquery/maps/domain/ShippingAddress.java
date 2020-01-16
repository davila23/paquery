package com.paquery.maps.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PQ_ShippingAddress")
public class ShippingAddress {

    @Id
    @Column(name = "ID")
    private Long id;
    @Column(name = "AddressDetail")
    private String addressDetail;
    @Column(name = "CreationDate")
    private Date creationDate;
    @Column(name = "Active")
    private Boolean active;
    @Column(name = "Deleted")
    private Boolean deleted;
    @Column(name = "Lng")
    private Double lng;
    @Column(name = "Lat")
    private Double lat;
    @Column(name = "AddressType")
    private String addressType;
    @Column(name = "Name")
    private String name;
    @Column(name = "Comment")
    private String comment;
    @OneToOne
    @JoinColumn(name = "UserID")
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
