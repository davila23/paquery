package com.paquery.maps.dto;

import com.paquery.maps.domain.ShippingSchedule;

import java.util.Date;

public class ShippingScheduleDto {

    private Long id;

    private String name;

    private String comment;

    private String addressDetail;

    private String destinationEmail;

    private Integer scheduleType;

    private ShippingAddressDto shippingAddress;

    private Date scheduledDate;

    private Date expirationDate;

    private String scheduledHour;

    public ShippingScheduleDto() {
    }

    public ShippingScheduleDto(ShippingSchedule schedule) {

        this.id = schedule.getId();
        this.name = schedule.getName();
        this.comment = schedule.getComment();
        this.addressDetail = schedule.getAddressDetail();
        this.destinationEmail = schedule.getDestinationEmail();
        this.scheduleType = schedule.getScheduleType();
        this.scheduledDate = schedule.getScheduledDate();
        this.expirationDate = schedule.getExpirationDate();
        this.scheduledHour = schedule.getScheduledHour();
    }

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

    public Integer getScheduleType() {
        return scheduleType;
    }

    public void setScheduleType(Integer scheduleType) {
        this.scheduleType = scheduleType;
    }

    public ShippingAddressDto getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(ShippingAddressDto shippingAddress) {
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
}
