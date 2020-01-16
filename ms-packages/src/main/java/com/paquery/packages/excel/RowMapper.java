package com.paquery.packages.excel;

import org.apache.poi.ss.usermodel.Row;

import java.util.Collection;

public interface RowMapper {

    void mapRow(Integer rowNumber, Row row, ExcelMetaInfo metainfo, Collection collection);

}
