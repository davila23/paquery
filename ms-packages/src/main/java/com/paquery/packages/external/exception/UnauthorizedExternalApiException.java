package com.paquery.packages.external.exception;

public class UnauthorizedExternalApiException extends Exception {
    public UnauthorizedExternalApiException(String message){
        super(message);
    }

    public UnauthorizedExternalApiException() {}

}
