package com.paquery.packages.domain;

import com.paquery.commons.enums.CustomerStatus;
import com.paquery.commons.enums.UserRoleEnum;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "PQ_User")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Email")
    private String email;

    @Column(name = "Mobile")
    private String mobile;

    @Column(name = "Name")
    private String name;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "Pwd")
    private String password;

    @Column(name = "Avatar")
    private String avatar;

    @Column(name = "UserRoleID")
    private Integer userRoleEnum;

    @Column(name = "SaltKey")
    private String saltKey;

    @Column(name = "Code")
    private String code;

    @Column(name = "Status")
    private Integer customerStatus;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @Column(name = "DocNumber")
    private String docNumber;

    @Column(name = "DocType")
    private Integer docType;

    @Column(name = "UserType")
    private Integer userType;

    @Column(name = "CityID")
    private Integer city;

    @Column(name = "AuthMode")
    private Integer authMode;

    @Column(name = "Source")
    private Integer source;

    @Column(name = "OwnerID")
    private Long ownerID;

    @Column(name = "OwnerType")
    private Integer OwnerType;

    @Column(name = "TermsAndConditions")
    private Integer termsAndConditions;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    public User() {

    }

    public User(String email, String mobile, String name, String lastName, String password, String avatar, Integer customerStatus, Integer userRoleEnum) {
        this.email = email;
        this.mobile = mobile;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.avatar = avatar;
        this.customerStatus = customerStatus;
        this.userRoleEnum = userRoleEnum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public UserRoleEnum getUserRoleEnum() {
        return UserRoleEnum.find(userRoleEnum);
    }

    public void setUserRoleEnum(UserRoleEnum userRoleEnum) {
        this.userRoleEnum = userRoleEnum.intValue();
    }

    public Integer getCustomerStatusInt() {
        return customerStatus;
    }

    public CustomerStatus getCustomerStatus() {
        return CustomerStatus.find(customerStatus);
    }

    public void setCustomerStatus(CustomerStatus customerStatus) {
        this.customerStatus = customerStatus.intValue();
    }

    public void setUserRoleEnum(Integer userRoleEnum) {
        this.userRoleEnum = userRoleEnum;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setCustomerStatus(Integer customerStatus) {
        this.customerStatus = customerStatus;
    }

    public String getSaltKey() {
        return saltKey;
    }

    public void setSaltKey(String saltKey) {
        this.saltKey = saltKey;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getDocNumber() {
        return docNumber;
    }

    public void setDocNumber(String docNumber) {
        this.docNumber = docNumber;
    }

    public Integer getDocType() {
        return docType;
    }

    public void setDocType(Integer docType) {
        this.docType = docType;
    }

    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public Integer getCity() {
        return city;
    }

    public void setCity(Integer city) {
        this.city = city;
    }

    public Integer getAuthMode() {
        return authMode;
    }

    public void setAuthMode(Integer authMode) {
        this.authMode = authMode;
    }

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public Integer getOwnerType() {
        return OwnerType;
    }

    public void setOwnerType(Integer ownerType) {
        OwnerType = ownerType;
    }

    public Integer getTermsAndConditions() {
        return termsAndConditions;
    }

    public void setTermsAndConditions(Integer termsAndConditions) {
        this.termsAndConditions = termsAndConditions;
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
