package com.paquery.packages.utils;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.chrono.IsoChronology;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateUtils {

    public static Date now() {
        return new Date();
    }

    public static Date nowAddHours(Date oldDate, int hours) {
        return new Date(oldDate.getTime() + TimeUnit.HOURS.toMillis(hours));
    }

    public static Date nowAddDays(Date oldDate, int days) {
        return new Date(oldDate.getTime() + TimeUnit.DAYS.toMillis(days));
    }

    public static Date dayLimit(Date date) {
        // retorno el mismo dia con hora 23:50:00:00
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);

        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar.getTime();
    }

    public static Date date(int day, int moth, int year) {
        Calendar calendar = Calendar.getInstance();

        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.MONTH, moth);
        calendar.set(Calendar.YEAR, year);

        calendar.set(Calendar.HOUR_OF_DAY, 12);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar.getTime();
    }

    public static Date addWorkingDays(Date date, Integer workingDays) {
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);

        int i = 0;
        while (i < workingDays) {

            calendar.add(Calendar.DATE, 1);

            int day = calendar.get(Calendar.DAY_OF_WEEK);
            if (day != Calendar.SUNDAY && day != Calendar.SATURDAY)
                ++i;

        }

        return calendar.getTime();
    }

    public static LocalDateTime nowLocalDateTime() {
        return LocalDateTime.now();
    }

    public static Date isWeekendSameDay(Date date) {
        // si el mismo dia es sabado o domingo llamo al metodo workingdays, el proximo dia habil
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int day = calendar.get(Calendar.DAY_OF_WEEK);
        if (day == Calendar.SUNDAY || day == Calendar.SATURDAY)
            return addWorkingDays(date, 1);
        return date;
    }

    public static int limitDayForMonth(LocalDateTime localDateTime) {

        boolean leapYear = IsoChronology.INSTANCE.isLeapYear(localDateTime.getYear());
        return Month.of(localDateTime.getMonthValue()).length(leapYear);
    }
}
