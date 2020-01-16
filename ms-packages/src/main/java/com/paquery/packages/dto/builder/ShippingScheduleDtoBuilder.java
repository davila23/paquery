package com.paquery.packages.dto.builder;

import com.paquery.commons.dto.ShippingScheduleDto;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.utils.DateUtils;
import com.paquery.packages.excel.UploadMassivePackageDto;

public class ShippingScheduleDtoBuilder {

    public ShippingScheduleDto build(UploadMassivePackageDto uploadDto, ScheduleType scheduleType) {
        ShippingScheduleDto shippingSchedule = new ShippingScheduleDto();
        ShippingAddressDtoBuilder shiAddresBuilder = new ShippingAddressDtoBuilder();

        shippingSchedule.setAddressDetail(uploadDto.getDireccion(scheduleType));
        shippingSchedule.setName(uploadDto.getNombre(scheduleType));
        shippingSchedule.setComment(uploadDto.getComentarios(scheduleType));
        shippingSchedule.setScheduleType(scheduleType);

        if (scheduleType == ScheduleType.Origin) {
            shippingSchedule.setScheduledDate(DateUtils.toLocalDateTime(uploadDto.getOrigenFechaHora()));
        } else {
            shippingSchedule.setScheduledDate(DateUtils.toLocalDateTime(uploadDto.getDestinoFechaHora()));

        }

        shippingSchedule.setShippingAddress(shiAddresBuilder.build(uploadDto, scheduleType));


        return shippingSchedule;
    }
}
