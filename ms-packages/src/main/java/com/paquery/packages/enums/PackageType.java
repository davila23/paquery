package com.paquery.packages.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PackageType {

    Delivery(1, "Recibir", "R"),

    Send(2, "Enviar", "E"),

    PickUp(3, "Pick Up", "P"),

    StoreWithdrawal(4, "Store Withdrawal", "S");

    private int value;

    private String description;

    private String code;

    private PackageType(int value, String description, String code) {
        this.value = value;
        this.description = description;
        this.code = code;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    public String getCode() {
        return code;
    }

    @Override
    public String toString() {
        return this.description;
    }


    public static PackageType searchByCode(String code) {
        for (PackageType pt : PackageType.values()) {
            if (pt.getCode().equals(code))
                return pt;
        }
        return null;
    }

    @JsonCreator
    public static PackageType valueOf(Integer value) {
        for (PackageType pt : PackageType.values()) {
            if (pt.getValue() == value)
                return pt;
        }
        return null;
    }
}
