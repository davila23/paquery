package com.paquery.maps.enums;

import java.util.HashMap;
import java.util.Map;

public enum PackageStatus {

    //Enviar antes que lo retiren
    PendingEntryPaquery(1, "Pendiente de Ingreso a PaQuery"),

    //Enviar antes que lo retiren
    LoggedInToPaQuery(22,"Ingresado a PaQuery"),

    pendingEntryPaQueryPoint(23,"Pendiente de Ingreso a PaQueryPoint"),

    ArrivedAtPaQueryPoint(2, "Arribado a PaQuery Point"),

    //Enviar antes que lo entreguen & recibir antes que lo entreguen
    // ex PendingDelivery
    InPowerOfThePaquer(3, "En Poder del Paquer"),

    DeliveryAttempt1(31,"Intento de Entrega 1"),

    DeliveryAttempt2(32,"Intento de Entrega 2"),

    OnWay(4,"En camino"),

    PendingSchedule(5,"Pendiente de programar"),

    Delivered(20,"Entregado"),

    Canceled(21,"Cancelado"),

    WrongAddress(25, "Dirección Incorrecta"),

    UnrecheableZone(26,"No es posible entregar en zona de destino"),

    Outstanding(30, "Pendiente de Pago"),

    Returned(40,"Devuelto"),

    Expired(50, "Expirado");


    private int value;
    private String description;

    private static Map<Integer, PackageStatus> map = new HashMap<Integer, PackageStatus>();

    static {
        for (PackageStatus packageStatus : PackageStatus.values()) {
            map.put(packageStatus.value, packageStatus);
        }
    }

    public static PackageStatus valueOf(Integer intValue) {
        return map.get(intValue);
    }

    private PackageStatus(int value, String description) {
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
        return new HashMap(){
            {
                put("value", value);
                put("description", description);
            }
        };
    }

}
