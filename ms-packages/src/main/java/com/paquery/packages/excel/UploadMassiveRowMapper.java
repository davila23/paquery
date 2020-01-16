package com.paquery.packages.excel;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Collection;

public class UploadMassiveRowMapper extends DataMapper implements RowMapper {


    @Override
    public void mapRow(Integer rowNumber, Row row, ExcelMetaInfo metaInfo, Collection collection) {

        UploadMassivePackageDto dto = new UploadMassivePackageDto();
        Integer colPosition;

        dto.setRowNumber(rowNumber);

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.NroExterno.getCode());
        dto.setExternalCode(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Tipo.getCode());
        dto.setTipo(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Comentarios_Adicionales.getCode());
        dto.setComentariosAdicionales(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Contenido.getCode());
        dto.setContenido(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Valor_Estimado.getCode());
        dto.setValorEstimado(toDouble(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Tam_Paquete.getCode());
        dto.setTamanioPaquete(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Nombre.getCode());
        dto.setOrigenNombre(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Comentarios.getCode());
        dto.setOrigenComentarios(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Dir.getCode());
        dto.setOrigenDireccion(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Dir_Comentarios.getCode());
        dto.setOrigenDireccionComentarios(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_w3w.getCode());
        dto.setOrigenW3w(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Fecha_Hora.getCode());
        dto.setOrigenFechaHora(toDate(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Nombre.getCode());
        dto.setDestinoNombre(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Comentarios.getCode());
        dto.setDestinoComentarios(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Mail_Destinatario.getCode());
        dto.setMailDestinatario(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Dir.getCode());
        dto.setDestinoDireccion(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Dir_Comentarios.getCode());
        dto.setDestinoDireccionComentarios(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_w3w.getCode());
        dto.setDestinoW3w(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Fecha_Hora.getCode());
        dto.setDestinoFechaHora(toDate(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.LogisticOperator.getCode());
        dto.setLogisticOperatorID(toLong(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.MarketPlace.getCode());
        dto.setMarketPlaceID(toLong(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.PQ.getCode());
        dto.setPQ(toLong(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Plazo.getCode());
        dto.setPlazo(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.DestinoTelefono.getCode());
        dto.setDestinoTelefono(toStr(getCell(row,colPosition)));

        colPosition = metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Stock.getCode());
        dto.setStock(toStr(getCell(row,colPosition)));


        collection.add(dto);
    }

    private Cell getCell(Row fila, Integer colPosition) {
        if (colPosition == null || fila == null)
            return null;
        return fila.getCell(colPosition);
    }

}
