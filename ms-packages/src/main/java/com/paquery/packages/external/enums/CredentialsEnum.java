package com.paquery.packages.external.enums;

public enum CredentialsEnum {

    TOKEN_JWT(1);

    private int value;

    CredentialsEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static CredentialsEnum valueOf(int value) {
        for (CredentialsEnum pr : CredentialsEnum.values())
            if (pr.value == value)
                return pr;

        return null;
    }
}
