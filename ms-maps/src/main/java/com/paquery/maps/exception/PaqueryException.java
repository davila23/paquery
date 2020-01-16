package com.paquery.maps.exception;

public abstract class PaqueryException extends Exception {

    private String message;

    public PaqueryException() {}

    public PaqueryException(String message) {
        this.message = message;
    }

    abstract int getErrorCode();

    @Override
    public String getMessage() {
        return message;
    }
}
