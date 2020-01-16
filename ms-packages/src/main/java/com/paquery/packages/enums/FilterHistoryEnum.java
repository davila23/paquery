package com.paquery.packages.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FilterHistoryEnum {

    LastMonth(1, "Mes anterior"),

    CurrentMonth(2, "Mes actual");

    private int value;

    private String description;


    FilterHistoryEnum(int value, String description) {
        this.value = value;
        this.description = description;
    }

    @JsonValue
    public int getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.description;
    }

    @JsonCreator
    public static FilterHistoryEnum valueOf(Integer value) {
        if (value == null)
            return null;

        for (FilterHistoryEnum fh : FilterHistoryEnum.values()) {
            if (fh.getValue() == value)
                return fh;
        }
        return null;
    }
}
