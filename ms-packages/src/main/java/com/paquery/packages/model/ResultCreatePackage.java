package com.paquery.packages.model;

import com.paquery.commons.enums.StatusResult;

public class ResultCreatePackage {

    private String message;

    private StatusResult statusResult;

    private Long packageID;

    public ResultCreatePackage(String message, StatusResult statusResult) {
        this.message = message;
        this.statusResult = statusResult;
    }

    public ResultCreatePackage(String message, StatusResult statusResult, Long packageID) {
        this.message = message;
        this.statusResult = statusResult;
        this.packageID = packageID;
    }

    public static ResultCreatePackage withError(String errorMessage) {
        return new ResultCreatePackage(errorMessage, StatusResult.ERROR);
    }

    public static ResultCreatePackage ok() {
        return new ResultCreatePackage("", StatusResult.OK);
    }

    public static ResultCreatePackage ok(Long packageID) {
        return new ResultCreatePackage("", StatusResult.OK, packageID);
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public StatusResult getStatusResult() {
        return statusResult;
    }

    public void setStatusResult(StatusResult statusResult) {
        this.statusResult = statusResult;
    }

    public Long getPackageID() {
        return packageID;
    }

    public void setPackageID(Long packageID) {
        this.packageID = packageID;
    }
}
