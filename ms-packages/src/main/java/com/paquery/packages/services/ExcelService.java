package com.paquery.packages.services;

import com.paquery.packages.excel.ExcelMetaInfo;
import com.paquery.packages.excel.RowMapper;
import com.paquery.packages.excel.RowWritter;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ExcelService {


    public void readExcel(InputStream excelFile, RowMapper mapper, List resultRows) throws IOException {

        Workbook workbook = createWB(excelFile);
        Sheet worksheet = workbook.getSheetAt(0);

        ExcelMetaInfo info = parseInfo(worksheet);


        for (int i = 1; i < worksheet.getPhysicalNumberOfRows(); ++i) {
            Row row = worksheet.getRow(i);
            if (row != null)
                mapper.mapRow(i, row, info, resultRows);
        }

    }


    public byte[] createExcel(List content, RowWritter writter, List<String> headers, Map<String, String> metainfo) throws IOException {
        Workbook workbook = new XSSFWorkbook();

        Sheet sheet = workbook.createSheet(metainfo.getOrDefault("sheetName", "0"));

        writeHeaders(sheet, headers);

        writeRows(content, writter, sheet);

        for (int i = 0; i < headers.size() ; i++)
            sheet.autoSizeColumn(i);

        return writeOut(workbook);
    }

    private byte[] writeOut(Workbook wb) throws IOException {

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        wb.write(out);
        out.close();

        return out.toByteArray();
    }

    private void writeHeaders(Sheet sheet, List<String> headers) {

        Row headerRow = sheet.createRow(0);

        int i = 0;
        for (String header : headers) {
            Cell cell = headerRow.createCell(i++);
            cell.setCellValue(header);
        }
    }

    private void writeRows(List content, RowWritter writter, Sheet sheet) {

        ExcelMetaInfo metainfo = parseInfo(sheet);

        int i = 1;
        for (Object object : content) {
            Row row = sheet.createRow(i++);
            writter.writeRow(object, row, metainfo);
        }
    }

    private Workbook createWB(InputStream file) throws IOException {
        byte[] data = StreamUtils.copyToByteArray(file);
        try {
            return new XSSFWorkbook(new ByteArrayInputStream(data));
        }
        catch(Exception e) {
            return new HSSFWorkbook(new ByteArrayInputStream(data));
        }
    }

    private ExcelMetaInfo parseInfo(Sheet sheet) {
        ExcelMetaInfo info = new ExcelMetaInfo();

        Row row = sheet.getRow(0);

        for (int i = 0; i < row.getPhysicalNumberOfCells(); i++) {
            info.addPosition(row.getCell(i).getStringCellValue(), i);
        }

        return info;
    }


    private void displayAllData(Sheet sheet) {
        for (int i = 1; i < sheet.getPhysicalNumberOfRows(); ++i) {
            Row row = sheet.getRow(i);
            String s = "";
            for (int j = 0; j < row.getPhysicalNumberOfCells(); ++j) {
                s += row.getCell(j).toString() + ", ";
            }
            System.out.println("Fila " + i + ": " + s);
        }
    }
}
