package com.paquery.packages.external.enums;

import org.springframework.util.StringUtils;

public enum ResultStatusEnum {

    VALID(0, "VALID", "Valido"),
    USED(1,"USED","Usado"),
    NONEXISTENT(2,"NONEXISTENT", "No existe o invalido");

    private int value;
    private String strValue;
    private String description;

    ResultStatusEnum(int value, String strValue, String desc) {
        this.value = value;
        this.strValue = strValue;
        this.description = desc;
    }

    public int getValue() {
        return value;
    }

    public String getStrValue() {
        return strValue;
    }

    public String getDescription() {
        return description;
    }

    public boolean equals(String strValue) {
        return this.strValue.equalsIgnoreCase(strValue);
    }

    static public ResultStatusEnum parse(String value) {
        for(ResultStatusEnum rs:ResultStatusEnum.values()) {
            if (rs.strValue.equalsIgnoreCase(value))
                return rs;
        }
        return null;
    }

}
