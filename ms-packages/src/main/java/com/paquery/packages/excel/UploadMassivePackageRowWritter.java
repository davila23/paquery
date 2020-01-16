package com.paquery.packages.excel;

import com.paquery.packages.model.ResultCreatePackage;
import org.apache.poi.ss.usermodel.Row;
import org.springframework.data.util.Pair;

public class UploadMassivePackageRowWritter extends DataMapper implements RowWritter {


    @Override
    public void writeRow(Object obj, Row row, ExcelMetaInfo metaInfo) {

        Pair<UploadMassivePackageDto, ResultCreatePackage> pair = cast(obj);

        UploadMassivePackageDto dto = pair.getFirst();
        ResultCreatePackage result = pair.getSecond();

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.NroExterno.getCode()), dto.getExternalCode());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Tipo.getCode()), dto.getTipo());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Contenido.getCode()), dto.getContenido());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Comentarios_Adicionales.getCode()), dto.getComentariosAdicionales());
        writeFloatCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Valor_Estimado.getCode()), dto.getValorEstimado());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Tam_Paquete.getCode()), dto.getTamanioPaquete());

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Nombre.getCode()), dto.getOrigenNombre());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Comentarios.getCode()), dto.getOrigenComentarios());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Dir.getCode()), dto.getOrigenDireccion());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Dir_Comentarios.getCode()), dto.getOrigenDireccionComentarios());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_w3w.getCode()), dto.getOrigenW3w());
        writeDateCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Origen_Fecha_Hora.getCode()), dto.getOrigenFechaHora());

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Nombre.getCode()), dto.getDestinoNombre());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Comentarios.getCode()), dto.getDestinoComentarios());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Dir.getCode()), dto.getDestinoDireccion());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Dir_Comentarios.getCode()), dto.getDestinoDireccionComentarios());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_w3w.getCode()), dto.getDestinoW3w());
        writeDateCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Destino_Fecha_Hora.getCode()), dto.getDestinoFechaHora());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.DestinoTelefono.getCode()), dto.getLogisticOperatorID());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Mail_Destinatario.getCode()), dto.getMailDestinatario());

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.LogisticOperator.getCode()), dto.getLogisticOperatorID());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.MarketPlace.getCode()), dto.getMarketPlaceID());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.PQ.getCode()), dto.getPQ());

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Plazo.getCode()), dto.getPlazo());
        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.Stock.getCode()), dto.getStock());

        writeCell(row, metaInfo.getPosition(ColTypeUploadMassivePackageEnum.ERROR.getCode()), result.getMessage());
    }

    private Pair<UploadMassivePackageDto, ResultCreatePackage> cast(Object obj) {

        if (!(obj instanceof Pair)) {
            throw new RuntimeException();
        }

        return (Pair<UploadMassivePackageDto, ResultCreatePackage>) obj;
    }
}
