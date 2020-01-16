package com.paquery.packages.excel;

import com.paquery.commons.enums.ScheduleType;

import java.util.Date;

public class UploadMassivePackageDto {

    private Integer rowNumber;

    private String externalCode;
    private String tipo;
    private String contenido;
    private String comentariosAdicionales;
    private Double valorEstimado;
    private String tamanioPaquete;

    private String origenNombre;
    private String origenComentarios;
    private String origenDireccion;
    private String origenDireccionComentarios;
    private String origenW3w;
    private Date origenFechaHora;
    private String destinoNombre;
    private String destinoComentarios;

    private String mailDestinatario;
    private String destinoDireccion;
    private String destinoDireccionComentarios;
    private String destinoW3w;
    private Date destinoFechaHora;
    private String destinoTelefono;

    private Long logisticOperatorID;
    private Long marketPlaceID;
    private Long PQ;
    private String plazo;

    private String stock;


    public Integer getRowNumber() {
        return rowNumber;
    }

    public void setRowNumber(Integer rowNumber) {
        this.rowNumber = rowNumber;
    }

    public String getExternalCode() {
        return externalCode;
    }

    public void setExternalCode(String externalCode) {
        this.externalCode = externalCode;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getComentariosAdicionales() {
        return comentariosAdicionales;
    }

    public void setComentariosAdicionales(String comentariosAdicionales) {
        this.comentariosAdicionales = comentariosAdicionales;
    }

    public Double getValorEstimado() {
        return valorEstimado;
    }

    public void setValorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
    }

    public String getTamanioPaquete() {
        return tamanioPaquete;
    }

    public void setTamanioPaquete(String tamanioPaquete) {
        this.tamanioPaquete = tamanioPaquete;
    }

    public String getOrigenNombre() {
        return origenNombre;
    }

    public void setOrigenNombre(String origenNombre) {
        this.origenNombre = origenNombre;
    }

    public String getOrigenComentarios() {
        return origenComentarios;
    }

    public void setOrigenComentarios(String origenComentarios) {
        this.origenComentarios = origenComentarios;
    }

    public String getOrigenDireccion() {
        return origenDireccion;
    }

    public void setOrigenDireccion(String origenDireccion) {
        this.origenDireccion = origenDireccion;
    }

    public String getDireccionComentarios(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenDireccionComentarios();
        return getDestinoDireccionComentarios();
    }

    public void setOrigenDireccionComentarios(String origenDireccionComentarios) {
        this.origenDireccionComentarios = origenDireccionComentarios;
    }

    public String getOrigenW3w() {
        return origenW3w;
    }

    public void setOrigenW3w(String origenW3w) {
        this.origenW3w = origenW3w;
    }

    public Date getOrigenFechaHora() {
        return origenFechaHora;
    }

    public void setOrigenFechaHora(Date origenFechaHora) {
        this.origenFechaHora = origenFechaHora;
    }

    public String getDestinoNombre() {
        return destinoNombre;
    }

    public void setDestinoNombre(String destinoNombre) {
        this.destinoNombre = destinoNombre;
    }

    public String getDestinoComentarios() {
        return destinoComentarios;
    }

    public void setDestinoComentarios(String destinoComentarios) {
        this.destinoComentarios = destinoComentarios;
    }

    public String getMailDestinatario() {
        return mailDestinatario;
    }

    public void setMailDestinatario(String mailDestinatario) {
        this.mailDestinatario = mailDestinatario;
    }

    public String getDestinoDireccion() {
        return destinoDireccion;
    }

    public void setDestinoDireccion(String destinoDireccion) {
        this.destinoDireccion = destinoDireccion;
    }

    public String getDestinoDireccionComentarios() {
        return destinoDireccionComentarios;
    }

    public void setDestinoDireccionComentarios(String destinoDireccionComentarios) {
        this.destinoDireccionComentarios = destinoDireccionComentarios;
    }

    public String getDestinoW3w() {
        return destinoW3w;
    }

    public void setDestinoW3w(String destinoW3w) {
        this.destinoW3w = destinoW3w;
    }

    public Date getDestinoFechaHora() {
        return destinoFechaHora;
    }

    public void setDestinoFechaHora(Date destinoFechaHora) {
        this.destinoFechaHora = destinoFechaHora;
    }

    public String getDestinoTelefono() {
        return destinoTelefono;
    }

    public void setDestinoTelefono(String destinoTelefono) {
        this.destinoTelefono = destinoTelefono;
    }

    public Long getLogisticOperatorID() {
        return logisticOperatorID;
    }

    public void setLogisticOperatorID(Long logisticOperatorID) {
        this.logisticOperatorID = logisticOperatorID;
    }

    public Long getMarketPlaceID() {
        return marketPlaceID;
    }

    public void setMarketPlaceID(Long marketPlaceID) {
        this.marketPlaceID = marketPlaceID;
    }

    public Long getPQ() {
        return PQ;
    }

    public void setPQ(Long PQ) {
        this.PQ = PQ;
    }

    public String getPlazo() {
        return plazo;
    }

    public void setPlazo(String plazo) {
        this.plazo = plazo;
    }


    public String getNombre(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenNombre();

        return getDestinoNombre();
    }
    public String getComentarios(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenComentarios();

        return getDestinoComentarios();
    }

    public String getMail(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return null;

        return getMailDestinatario();
    }
    public String getDireccion(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenDireccion();

        return getDestinoDireccion();
    }

    public String getComentariosDireccion(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenComentarios();

        return getDestinoComentarios();
    }

    public String getW3w(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenW3w();

        return getDestinoW3w();
    }

    public Date getFechaHora(ScheduleType type) {
        if (type == ScheduleType.Origin)
            return getOrigenFechaHora();

        return getDestinoFechaHora();
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getOrigenDireccionComentarios() {
        return origenDireccionComentarios;
    }
}
