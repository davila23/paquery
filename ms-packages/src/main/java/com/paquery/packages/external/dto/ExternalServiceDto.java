package com.paquery.packages.external.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.paquery.commons.enums.OwnerType;
import com.paquery.packages.external.enums.CredentialsEnum;
import com.paquery.packages.external.enums.LoginFlowEnum;
import com.paquery.packages.external.enums.ParameterResolverEnum;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;


@Validated
public class ExternalServiceDto {

    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String nameService;

    @NotNull
    private String loginUrl;

    @NotNull
    private String apiUrl;

    @NotNull
    private Long ownerID;

    @NotNull
    private OwnerType ownerType;

    @NotNull
    private LoginFlowEnum loginFlow;

    @NotNull
    private ParameterResolverEnum parameterResolver;

    @NotNull
    private CredentialsEnum credentialsType;


    @JsonCreator
    public ExternalServiceDto(
            @JsonProperty("id") Long id,
            @JsonProperty("username") String username,
            @JsonProperty("password") String password,
            @JsonProperty("nameService") String nameService,
            @JsonProperty("loginUrl") String loginUrl,
            @JsonProperty("apiUrl") String apiUrl,

            @JsonProperty("ownerID") Long ownerID,
            @JsonProperty("ownerType") Integer ownerType,

            @JsonProperty("loginFlow") Integer loginFlow,
            @JsonProperty("parameterResolver") Integer parameterResolver,
            @JsonProperty("credentialsType") Integer credentialsType
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.nameService = nameService;
        this.loginUrl = loginUrl;
        this.apiUrl = apiUrl;

        this.ownerID = ownerID;
        this.ownerType = OwnerType.valueOf(ownerType);

        this.loginFlow = LoginFlowEnum.valueOf(loginFlow);
        this.parameterResolver = ParameterResolverEnum.valueOf(parameterResolver);
        this.credentialsType = CredentialsEnum.valueOf(credentialsType);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getLoginUrl() {
        return loginUrl;
    }

    public void setLoginUrl(String loginUrl) {
        this.loginUrl = loginUrl;
    }

    public String getApiUrl() {
        return apiUrl;
    }

    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public OwnerType getOwnerType() {
        return ownerType;
    }

    public void setOwnerType(OwnerType ownerType) {
        this.ownerType = ownerType;
    }

    public LoginFlowEnum getLoginFlow() {
        return loginFlow;
    }

    public void setLoginFlow(LoginFlowEnum loginFlow) {
        this.loginFlow = loginFlow;
    }

    public ParameterResolverEnum getParameterResolver() {
        return parameterResolver;
    }

    public void setParameterResolver(ParameterResolverEnum parameterResolver) {
        this.parameterResolver = parameterResolver;
    }

    public CredentialsEnum getCredentialsType() {
        return credentialsType;
    }

    public void setCredentialsType(CredentialsEnum credentialsType) {
        this.credentialsType = credentialsType;
    }

    public String getNameService() {
        return nameService;
    }

    public void setNameService(String nameService) {
        this.nameService = nameService;
    }
}
