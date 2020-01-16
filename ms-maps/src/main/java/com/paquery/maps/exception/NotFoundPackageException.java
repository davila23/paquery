package com.paquery.maps.exception;

public class NotFoundPackageException extends PaqueryException {

    private static Integer errorCode = 2;

    public NotFoundPackageException() {
        super("");
    }

    public NotFoundPackageException(String msg) {
        super(msg);
    }

    @Override
    int getErrorCode() {
        return errorCode;
    }
}
