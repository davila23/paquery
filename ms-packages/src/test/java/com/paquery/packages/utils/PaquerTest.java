package com.paquery.packages.utils;

import com.paquery.packages.enums.FilterHistoryEnum;
import com.paquery.packages.services.PaquerService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.Map;

import static com.paquery.packages.services.PaquerService.SINCE_DATE;
import static com.paquery.packages.services.PaquerService.TO_DATE;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PaquerTest {

    @Autowired
    private PaquerService paquerService;

    @Test
    public void testResolveDates() {
        LocalDateTime now = DateUtils.nowLocalDateTime().withNano(0);


        Map<String, LocalDateTime> dates = paquerService.resolveFilterMonthDates(FilterHistoryEnum.CurrentMonth);

        Assert.assertEquals(dates.get(SINCE_DATE), LocalDateTime.of(now.getYear(), now.getMonth(), 1, 00, 00, 00));

        Assert.assertEquals(dates.get(TO_DATE).withNano(0), now);


        dates.clear();


        LocalDateTime dateMesAnterior = now.minusMonths(1);

        dates = paquerService.resolveFilterMonthDates(FilterHistoryEnum.LastMonth);

        Assert.assertEquals(dates.get(SINCE_DATE), LocalDateTime.of(now.getYear(), dateMesAnterior.getMonthValue(), 1, 00, 00, 00));

        Assert.assertEquals(dates.get(TO_DATE).withNano(0),
                LocalDateTime.of(now.getYear(), dateMesAnterior.getMonthValue(), DateUtils.limitDayForMonth(dateMesAnterior), 23, 59, 59).withNano(0));
    }
}
