package com.paquery.maps.dto;

import com.paquery.maps.domain.Package;

import java.util.Date;

public class PackageDto {

    private Long id;

    private String caption;

    private String code;

    private String detail;

    private Integer status;

    private Boolean active;

    private Boolean deleted;

    private String externalCode;

    private Integer extenalTypeCode;

    private Integer packageSize;

    private Integer packageType;

    private Double rate;

    private Integer ownerType;

    private Integer ownerID;

    private Date creationDate;

    private Date modificationDate;

    private Date calcelationDate;

    private ShippingScheduleDto shippingScheduleOrigin;

    private ShippingScheduleDto shippingScheduleDestination;

    public PackageDto() {
    }

    public PackageDto(Package pack) {

        this.id = pack.getId();
        this.caption = pack.getCaption();
        this.code = pack.getCode();
        this.detail = pack.getDetail();
        this.status = pack.getStatus();
        this.active = pack.getActive();
        this.deleted = pack.getDeleted();
        this.externalCode = pack.getExternalCode();
        this.extenalTypeCode = pack.getExtenalTypeCode();
        this.packageSize = pack.getPackageSize();
        this.packageType = pack.getPackageType();
        this.rate = pack.getRate();
        this.ownerType = pack.getOwnerType();
        this.ownerID = pack.getOwnerID();
        this.creationDate = pack.getCreationDate();
        this.modificationDate = pack.getModificationDate();
        this.calcelationDate = pack.getCalcelationDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
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

    public String getExternalCode() {
        return externalCode;
    }

    public void setExternalCode(String externalCode) {
        this.externalCode = externalCode;
    }

    public Integer getExtenalTypeCode() {
        return extenalTypeCode;
    }

    public void setExtenalTypeCode(Integer extenalTypeCode) {
        this.extenalTypeCode = extenalTypeCode;
    }

    public Integer getPackageSize() {
        return packageSize;
    }

    public void setPackageSize(Integer packageSize) {
        this.packageSize = packageSize;
    }

    public Integer getPackageType() {
        return packageType;
    }

    public void setPackageType(Integer packageType) {
        this.packageType = packageType;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Integer getOwnerType() {
        return ownerType;
    }

    public void setOwnerType(Integer ownerType) {
        this.ownerType = ownerType;
    }

    public Integer getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Integer ownerID) {
        this.ownerID = ownerID;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(Date modificationDate) {
        this.modificationDate = modificationDate;
    }

    public Date getCalcelationDate() {
        return calcelationDate;
    }

    public void setCalcelationDate(Date calcelationDate) {
        this.calcelationDate = calcelationDate;
    }

    public ShippingScheduleDto getShippingScheduleOrigin() {
        return shippingScheduleOrigin;
    }

    public void setShippingScheduleOrigin(ShippingScheduleDto shippingScheduleOrigin) {
        this.shippingScheduleOrigin = shippingScheduleOrigin;
    }

    public ShippingScheduleDto getShippingScheduleDestination() {
        return shippingScheduleDestination;
    }

    public void setShippingScheduleDestination(ShippingScheduleDto shippingScheduleDestination) {
        this.shippingScheduleDestination = shippingScheduleDestination;
    }
}
