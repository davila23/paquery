package com.paquery.packages.utils;

import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

import static com.paquery.packages.utils.DateUtils.dayLimit;

public class DateUtilsTest {

    @Test
    public void testAddWorkingDays() {

        // Jueves 4 de julio de 2019
        Date fecha = DateUtils.date(4, Calendar.JULY, 2019);

        // Sabado y Domingo no Cuentan
        fecha = DateUtils.addWorkingDays(fecha, 4);
        Assert.assertEquals(fecha, DateUtils.date(10, Calendar.JULY, 2019));
    }

    @Test
    public void testAddWorkingDaysInWeekend() {

        // Viernes 5 de julio de 2019
        Date fecha = DateUtils.date(5, Calendar.JULY, 2019);

        // Sabado y Domingo no Cuentan
        fecha = DateUtils.addWorkingDays(fecha, 1);
        Assert.assertEquals(DateUtils.date(8, Calendar.JULY, 2019), fecha);


        // Sabado 6 de julio de 2019
        Date fecha2 = DateUtils.date(6, Calendar.JULY, 2019);

        // Sabado y Domingo no Cuentan
        fecha2 = DateUtils.addWorkingDays(fecha2, 3);
        Assert.assertEquals(DateUtils.date(10, Calendar.JULY, 2019), fecha2);
    }

    @Test
    public void testAddManyWorkingDays() {

        // Miercoles 3 de julio de 2019
        Date fecha = DateUtils.date(3, Calendar.JULY, 2019);

        // Sabado y Domingo no Cuentan
        fecha = DateUtils.addWorkingDays(fecha, 20);
        Assert.assertEquals(DateUtils.date(31, Calendar.JULY, 2019), fecha);

    }

    @Test
    public void testDayLimit() {
        Date fechaAhora = DateUtils.now();
        Date fechaLimit = dayLimit(fechaAhora);

        Assert.assertEquals(fechaAhora.getDay(), fechaLimit.getDay());
        Assert.assertEquals(fechaAhora.getYear(), fechaLimit.getYear());
        Assert.assertEquals(fechaAhora.getMonth(), fechaLimit.getMonth());
        Assert.assertEquals(23, fechaLimit.getHours());
        Assert.assertEquals(59, fechaLimit.getMinutes());
        Assert.assertEquals(00, fechaLimit.getSeconds());

    }

    @Test
    public void testIsWeekendSameDay() {
        // dia laboral
        Date fechaSemana = DateUtils.date(6, Calendar.AUGUST, 2019);
        Date fechaSemanaSameDay = DateUtils.isWeekendSameDay(fechaSemana);
        //misma fecha
        Assert.assertEquals(fechaSemana, fechaSemanaSameDay);


        //FINES DE SEMANA
        Date lunesSiguiente = DateUtils.date(5, Calendar.AUGUST, 2019);
        // fecha Sabado
        Date fechaFinDeSemana = DateUtils.date(3, Calendar.AUGUST, 2019);
        Date fechaFinDeSemanaSameDay = DateUtils.isWeekendSameDay(fechaFinDeSemana);
        Assert.assertNotEquals(fechaFinDeSemana, fechaFinDeSemanaSameDay);
        // tendria que sumar 2 dias.
        Assert.assertEquals(lunesSiguiente.getDay(), fechaFinDeSemanaSameDay.getDay());

        // fecha Domingo
        fechaFinDeSemana = DateUtils.date(4, Calendar.AUGUST, 2019);
        fechaFinDeSemanaSameDay = DateUtils.isWeekendSameDay(fechaFinDeSemana);
        Assert.assertNotEquals(fechaFinDeSemana, fechaFinDeSemanaSameDay);
        // tendria que sumar un dia..
        Assert.assertEquals(lunesSiguiente.getDay(), fechaFinDeSemanaSameDay.getDay());
    }

    @Test
    public void limitDayForLastMonth() {

        LocalDateTime january = LocalDateTime.of(1990, 1, 1, 00, 00, 00);

        int limit = DateUtils.limitDayForMonth(january);

        Assert.assertEquals(limit, 31);


        LocalDateTime february = LocalDateTime.of(2016, 2, 1, 00, 00, 00);

        limit = DateUtils.limitDayForMonth(february);

        Assert.assertEquals(limit, 29); //bisiestp


        LocalDateTime february28 = LocalDateTime.of(2018, 2, 1, 00, 00, 00);

        limit = DateUtils.limitDayForMonth(february28);

        Assert.assertEquals(limit, 28);


        limit = DateUtils.limitDayForMonth(february28.minusMonths(1));//le resta a enero

        Assert.assertEquals(limit, 31);

        limit = DateUtils.limitDayForMonth(january.minusMonths(1));//le resta a diciembre del anio pasado

        Assert.assertEquals(limit, 31);
    }
}
