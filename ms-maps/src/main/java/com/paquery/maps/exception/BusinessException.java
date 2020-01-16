package com.paquery.maps.exception;

public class BusinessException extends PaqueryException {

    final static Integer errorCode = 1;

    @Override
    int getErrorCode() {
        return errorCode;
    }
}
