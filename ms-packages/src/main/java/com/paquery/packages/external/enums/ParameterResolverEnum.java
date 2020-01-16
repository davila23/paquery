package com.paquery.packages.external.enums;

public enum ParameterResolverEnum {

    JWT_DATA(1);

    private int value;

    ParameterResolverEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static ParameterResolverEnum valueOf(int value) {
        for (ParameterResolverEnum pr : ParameterResolverEnum.values())
            if (pr.value == value)
                return pr;

        return null;
    }

}
