package com.paquery.packages.excel;

import java.util.LinkedHashMap;
import java.util.Map;

public class ExcelMetaInfo {

    Map<String, Integer> colPositions;

    public ExcelMetaInfo() {
        colPositions = new LinkedHashMap<>();
    }

    public void addPosition(String type, Integer position) {
        colPositions.put(type, position);
    }

    public Integer getPosition(String col) {
        if (colPositions.containsKey(col))
            return colPositions.get(col);

        return null;
    }
}
