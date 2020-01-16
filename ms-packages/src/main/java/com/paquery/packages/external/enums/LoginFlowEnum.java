package com.paquery.packages.external.enums;

public enum LoginFlowEnum {

    COMMON(1), // username=...&password=...
    OAUTH2(2); // grant_type=...&username=...&password=...

    private int value;

    LoginFlowEnum(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    static public LoginFlowEnum valueOf(int value) {
        for (LoginFlowEnum lf : LoginFlowEnum.values())
            if (lf.value == value)
                return lf;

        return null;
    }

}
