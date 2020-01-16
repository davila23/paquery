package com.paquery.packages.external.domain;

import com.paquery.packages.external.dao.ExternalServiceCredentialsDao;
import com.paquery.packages.external.dto.ExternalServiceDto;
import com.paquery.packages.external.enums.CredentialsEnum;
import com.paquery.packages.external.enums.LoginFlowEnum;
import com.paquery.packages.external.enums.ParameterResolverEnum;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PQ_ExternalServiceCredentials")
public class ExternalServiceCredentials {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;

    @Column(name = "NameService")
    private String nameService;

    @NotNull
    @Column(name = "OwnerID")
    private Long ownerID;

    @NotNull
    @Column(name = "OwnerType")
    private Integer ownerType;

    @NotNull
    @Column(name = "LoginUrl")
    private String loginUrl;

    @NotNull
    @Column(name = "Username")
    private String username;

    @NotNull
    @Column(name = "Password")
    private String password;

    @NotNull
    @Column(name = "ApiUrl")
    private String apiUrl;

    @NotNull
    @Column(name = "LoginFlowType")
    private Integer loginFlowType;

    @NotNull
    @Column(name = "parametersResolverType")
    private Integer parametersResolverType;

    @NotNull
    @Column(name = "credentialsType")
    private Integer credentialsType;

    public ExternalServiceCredentials() {}

    public ExternalServiceCredentials(ExternalServiceDto credentialsDto) {
        this.nameService = credentialsDto.getNameService();
        this.username = credentialsDto.getUsername();
        this.password = credentialsDto.getPassword();

        this.ownerID = credentialsDto.getOwnerID();
        this.ownerType = credentialsDto.getOwnerType().getValue();

        this.apiUrl = credentialsDto.getApiUrl();
        this.loginUrl = credentialsDto.getLoginUrl();

        this.parametersResolverType = credentialsDto.getParameterResolver().getValue();
        this.credentialsType = credentialsDto.getCredentialsType().getValue();
        this.loginFlowType = credentialsDto.getLoginFlow().getValue();
    }


    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public Integer getOwnerType() {
        return ownerType;
    }

    public void setOwnerType(Integer ownerType) {
        this.ownerType = ownerType;
    }

    public String getLoginUrl() {
        return loginUrl;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public LoginFlowEnum getLoginFlowType() {
        return LoginFlowEnum.valueOf(loginFlowType);
    }

    public Integer getLoginFlowTypeIntValue() {
        return loginFlowType;
    }

    public void setLoginFlowType(LoginFlowEnum loginFlowType) {
        this.loginFlowType = loginFlowType.getValue();
    }

    public ParameterResolverEnum getParametersResolverType() {
        return ParameterResolverEnum.valueOf(parametersResolverType);
    }

    public Integer getParametersResolverTypeIntValue() {
        return parametersResolverType;
    }

    public void setParametersResolverType(ParameterResolverEnum parametersResolverType) {
        this.parametersResolverType = parametersResolverType.getValue();
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

    public String getNameService() {
        return nameService;
    }

    public void setNameService(String nameService) {
        this.nameService = nameService;
    }
}
