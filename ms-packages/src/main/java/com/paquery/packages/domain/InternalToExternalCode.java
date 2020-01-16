package com.paquery.packages.domain;

import javax.persistence.*;

@Entity
@Table(name = "PQ_InternalToExternalCode")
public class InternalToExternalCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "MarketPlaceID")
    private Long marketPlaceID;

    @Column(name = "InternalToExternalCodeID")
    private Long internalToExternalCodeID;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    public InternalToExternalCode() {

    }

    public InternalToExternalCode(Long marketPlaceID, Long internalToExternalCodeID) {
        this.marketPlaceID = marketPlaceID;
        this.internalToExternalCodeID = internalToExternalCodeID;
        this.active = true;
        this.deleted = false;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMarketPlaceID() {
        return marketPlaceID;
    }

    public void setMarketPlaceID(Long marketPlaceID) {
        this.marketPlaceID = marketPlaceID;
    }

    public Long getInternalToExternalCodeID() {
        return internalToExternalCodeID;
    }

    public void setInternalToExternalCodeID(Long internalToExternalCodeID) {
        this.internalToExternalCodeID = internalToExternalCodeID;
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
