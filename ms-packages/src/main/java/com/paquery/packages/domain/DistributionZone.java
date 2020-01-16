package com.paquery.packages.domain;

import com.paquery.commons.dto.DistributionZoneDto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "PQ_DistributionZone")
public class DistributionZone {
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "PostalCode")
    private String postalCode;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    public DistributionZone(DistributionZoneDto distributionZoneDto) {
        this.id = distributionZoneDto.getId();
        this.name = distributionZoneDto.getName();
        this.postalCode = distributionZoneDto.getPostalCode();
        this.active = distributionZoneDto.getActive();
        this.deleted = distributionZoneDto.getDeleted();
    }

    public DistributionZone() {
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

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
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

    public String getDescription(){
        return   String.format("%s - CP:%s",this.name,this.postalCode);
    }
}
