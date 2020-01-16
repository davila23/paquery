package com.paquery.packages.excel;

import java.util.ArrayList;
import java.util.List;

public enum ColTypeUploadMassivePackageEnum {

    NroExterno("Nro_Externo", ColExcelType.String),
    Tipo("Tipo", ColExcelType.String),
    Contenido("Contenido", ColExcelType.String),
    Comentarios_Adicionales("Comentarios_Adicionales", ColExcelType.String),
    Valor_Estimado("Valor_Estimado", ColExcelType.Float),
    Tam_Paquete("Tam_Paquete", ColExcelType.String),
    Origen_Nombre("Origen_Nombre", ColExcelType.String),
    Origen_Comentarios("Origen_Comentarios", ColExcelType.String),
    Origen_Dir("Origen_Dir", ColExcelType.String),
    Origen_Dir_Comentarios("Origen_Dir_Comentarios", ColExcelType.String),
    Origen_w3w("Origen_w3w", ColExcelType.String),
    Origen_Fecha_Hora("Origen_Fecha_Hora", ColExcelType.DateTime),
    Destino_Nombre("Destino_Nombre", ColExcelType.String),
    Destino_Comentarios("Destino_Comentarios", ColExcelType.String),
    Mail_Destinatario("Mail_Destinatario",ColExcelType.String),
    Destino_Dir("Destino_Dir",ColExcelType.String),
    Destino_Dir_Comentarios("Destino_Dir_Comentarios", ColExcelType.String),
    Destino_w3w("Destino_w3w", ColExcelType.String),
    Destino_Fecha_Hora("Destino_Fecha_Hora",ColExcelType.Date),
    LogisticOperator("OPL", ColExcelType.Integer),
    MarketPlace("MP", ColExcelType.Integer),
    PQ("PQ", ColExcelType.Integer),
    Plazo("Plazo",ColExcelType.String),
    DestinoTelefono("Destino_Telefono", ColExcelType.String),
    Stock("Stock", ColExcelType.String),

    ERROR("ERROR", ColExcelType.String);


    private String code;
    private ColExcelType type;

    ColTypeUploadMassivePackageEnum(String code, ColExcelType type) {
        this.code = code;
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public ColExcelType getDataType() {
        return type;
    }

    public static List<String> getColumnNames() {
        List columnNames = new ArrayList();
        for (ColTypeUploadMassivePackageEnum colType: ColTypeUploadMassivePackageEnum.values())
            columnNames.add(colType.getCode());

        return columnNames;
    }
}
