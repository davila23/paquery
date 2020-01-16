package com.paquery.maps.enums;

import java.util.HashMap;
import java.util.Map;

public enum ScheduleType {

    Origin(1, "Origen"),

    Destiny(2, "Destino");

    private int value;
    private String description;

    private static Map<Integer, ScheduleType> map = new HashMap<>();

    static {
        for (ScheduleType scheduleType : ScheduleType.values()) {
            map.put(scheduleType.value, scheduleType);
        }
    }

    public static ScheduleType valueOf(Integer intValue) {
        return map.get(intValue);
    }

    ScheduleType(int value, String description) {
        this.value = value;
        this.description = description;
    }


    public int getValue() {
        return value;
    }

    @Override
    public String toString() {
        return this.description;
    }

    public Map toMap() {
        return new HashMap() {
            {
                put("value", value);
                put("description", description);
            }
        };
    }
}
