package com.paquery.maps.dto.builder;

import com.paquery.maps.domain.ShippingSchedule;
import com.paquery.maps.dto.ShippingAddressDto;
import com.paquery.maps.dto.ShippingScheduleDto;

public class ShippingSchduleDtoBuilder {

    public ShippingScheduleDto builder(ShippingSchedule shippingSchedule, ShippingAddressDto address) {
        ShippingScheduleDto shippingDto = new ShippingScheduleDto(shippingSchedule);
        shippingDto.setShippingAddress(address);
        return shippingDto;
    }
}
