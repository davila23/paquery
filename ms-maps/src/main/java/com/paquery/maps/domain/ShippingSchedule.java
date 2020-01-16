package com.paquery.maps.domain;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PQ_ShippingSchedule")
public class ShippingSchedule {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "AddressDetail")
    private String addressDetail;

    @Column(name = "DestinationEmail")
    private String destinationEmail;

    @Column(name = "ScheduleType")
    private Integer scheduleType;

    @Column(name = "ScheduledDate")
    private Date scheduledDate;

    @Column(name = "ExpirationDate")
    private Date expirationDate;

    @Column(name = "ScheduledHour")
    private String scheduledHour;

    @ManyToOne
    @JoinColumn(name = "PackageID")
    private Package paqueryPackage;

    @OneToOne
    @JoinColumn(name = "DistributionZoneID")
    private DistributionZone distributionZone;

    @OneToOne
    @JoinColumn(name = "ShippingAddressID")
    private ShippingAddress shippingAddress;

    @ManyToOne
    @JoinColumn(name = "DriverID")
    private Paquer paquer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getDestinationEmail() {
        return destinationEmail;
    }

    public void setDestinationEmail(String destinationEmail) {
        this.destinationEmail = destinationEmail;
    }

    public Package getPaqueryPackage() {
        return paqueryPackage;
    }

    public void setPaqueryPackage(Package paqueryPackage) {
        this.paqueryPackage = paqueryPackage;
    }

    public Integer getScheduleType() {
        return scheduleType;
    }

    public void setScheduleType(Integer scheduleType) {
        this.scheduleType = scheduleType;
    }

    public DistributionZone getDistributionZone() {
        return distributionZone;
    }

    public void setDistributionZone(DistributionZone distributionZone) {
        this.distributionZone = distributionZone;
    }

    public ShippingAddress getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(ShippingAddress shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Date getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(Date scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getScheduledHour() {
        return scheduledHour;
    }

    public void setScheduledHour(String scheduledHour) {
        this.scheduledHour = scheduledHour;
    }

    public Paquer getPaquer() {
        return paquer;
    }

    public void setPaquer(Paquer paquer) {
        this.paquer = paquer;
    }
}
