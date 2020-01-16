package com.paquery.maps.domain;

import com.paquery.maps.enums.PackageStatus;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "PQ_Package")
public class Package {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "Caption")
    private String caption;

    @Column(name = "Code")
    private String code;

    @Column(name = "Detail")
    private String detail;

    @Column(name = "Status")
    private Integer status;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "ExternalCode")
    private String externalCode;

    @Column(name = "ExternalTypeCode")
    private Integer extenalTypeCode;

    @Column(name = "PackageSize")
    private Integer packageSize;

    @Column(name = "PackageType")
    private Integer packageType;

    @Column(name = "Rate")
    private Double rate;

    @Column(name = "OwnerType")
    private Integer ownerType;

    @Column(name = "OwnerID")
    private Integer ownerID;

    @Column(name = "CreationDate")
    private Date creationDate;

    @Column(name = "ModificationDate")
    private Date modificationDate;

    @Column(name = "CancelationDate")
    private Date calcelationDate;

    @OneToOne
    @JoinColumn(name = "UserID")
    private User user;

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


    public void setCalcelationDate(Date calcelationDate) {
        this.calcelationDate = calcelationDate;
    }

    public Date getCalcelationDate() {
        return calcelationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PackageStatus getPackageStatus() {
        return PackageStatus.valueOf(this.status);
    }

    public void setPackageStatus(PackageStatus packageStatus) {
        this.status = packageStatus.getValue();
    }
}
