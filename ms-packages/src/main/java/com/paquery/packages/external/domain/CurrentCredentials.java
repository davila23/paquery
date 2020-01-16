package com.paquery.packages.external.domain;

import com.paquery.commons.enums.OwnerType;
import com.paquery.packages.external.enums.CredentialsEnum;
import com.paquery.commons.utils.JsonUtil;
import com.paquery.commons.utils.DateUtils;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "PQ_CurrentCredentials")
public class CurrentCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "OwnerID")
    private Long ownerID;

    @NotNull
    @Column(name = "OwnerType")
    private Integer ownerType;

    @NotNull
    @Column(name = "Payload")
    private String payload;

    @NotNull
    @Column(name = "CredentialsType")
    private Integer credentialsType;

    private Long expiresIn;

    private LocalDateTime lastModification;

    // para JPA
    public CurrentCredentials() { }

    public CurrentCredentials(ExternalServiceCredentials serviceCredentials, String payload) {
        this.ownerID = serviceCredentials.getOwnerID();
        this.ownerType = serviceCredentials.getOwnerType();
        this.credentialsType = serviceCredentials.getCredentialsTypeIntValue();
        this.payload = payload;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public Integer getOwnerTypeIntValue() {
        return ownerType;
    }

    public OwnerType getOwnerType() {
        return OwnerType.valueOf(ownerType);
    }

    public void setOwnerType(OwnerType ownerType) {
        this.ownerType = ownerType.getValue();
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public Integer getCredentialsTypeIntValue() {
        return credentialsType;
    }

    public CredentialsEnum getCredentialsType() {
        return CredentialsEnum.valueOf(credentialsType);
    }

    public void setCredentialsType(CredentialsEnum credentialsType) {
        this.credentialsType = credentialsType.getValue();
    }

    public Long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public LocalDateTime getLastModification() {
        return lastModification;
    }

    public void setLastModification(LocalDateTime lastModification) {
        this.lastModification = lastModification;
    }

    public void update(CurrentCredentials newCredentials) {

        this.lastModification = DateUtils.nowLocalDateTime();
        this.payload = newCredentials.payload;

    }

    public Boolean isValid() {
        return true;
    }

    public String getTokenHeaderValue() {
        // TODO: refactor valor de "Bearer" para hacer parametrizable
        return "Bearer " + JsonUtil.extractToken(this.payload);
    }
}
