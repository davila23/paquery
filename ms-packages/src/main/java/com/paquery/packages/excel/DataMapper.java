package com.paquery.packages.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;

import java.util.Date;

public class DataMapper {

    protected String toStr(Cell cell) {
        if (cell == null) return null;

        if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {

            if (cell instanceof XSSFCell)
                return ((XSSFCell) cell).getRawValue();

            return Double.toString(cell.getNumericCellValue());
        }

        return cell.getStringCellValue();
    }

    protected Integer toInt(Cell cell) {
        if (cell == null) return null;

        if (cell.getCellType() == Cell.CELL_TYPE_STRING)
            return Integer.valueOf(cell.getStringCellValue());

        return (int)cell.getNumericCellValue();
    }

    protected Long toLong(Cell cell) {
        if (cell == null) return null;

        if (cell.getCellType() == Cell.CELL_TYPE_STRING)
            return Long.valueOf(cell.getStringCellValue());

        return (long)cell.getNumericCellValue();
    }

    protected Double toDouble(Cell cell) {
        if (cell == null) return null;
        return cell.getNumericCellValue();
    }

    protected Date toDate(Cell cell) {
        if (cell == null) return null;
        return cell.getDateCellValue();
    }


    protected void writeCell(Row row, int col, String value) {
        if (value == null) return;

        Cell cell = row.createCell(col);
        cell.setCellValue(value);
    }

    protected void writeCell(Row row, int col, Integer value) {
        if (value == null) return;

        Cell cell = row.createCell(col);
        cell.setCellValue(value.toString());
    }

    protected void writeCell(Row row, int col, Long value) {
        if (value == null) return;

        Cell cell = row.createCell(col);
        cell.setCellValue(value.toString());
    }

    protected void writeFloatCell(Row row, int col, Double value) {
        if (value == null) return;
        Cell cell = row.createCell(col);
        cell.setCellValue(value);
    }

    protected void writeDateCell(Row row, int col, Date value) {
        if (value == null) return;

        Cell cell = row.createCell(col);
        cell.setCellValue(value);
    }
}
