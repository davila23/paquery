package com.paquery.packages.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

public interface RowWritter {

    void writeRow(Object obj, Row row, ExcelMetaInfo metaInfo);

}
