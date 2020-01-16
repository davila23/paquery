package com.paquery.packages.dto.builder;

import com.paquery.commons.dto.ShippingAddressDto;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.packages.excel.UploadMassivePackageDto;
import com.paquery.commons.utils.DateUtils;

public class ShippingAddressDtoBuilder {
    public ShippingAddressDto build(UploadMassivePackageDto uploadDto, ScheduleType scheduleType) {
        ShippingAddressDto shippingAddressDto = new ShippingAddressDto();

        shippingAddressDto.setAddressDetail(uploadDto.getDireccion(scheduleType));
        shippingAddressDto.setComment(uploadDto.getDireccionComentarios(scheduleType));
        shippingAddressDto.setName(uploadDto.getNombre(scheduleType));
        shippingAddressDto.setGeoKey(uploadDto.getW3w(scheduleType));
        shippingAddressDto.setCreationDate(DateUtils.nowLocalDateTime());

        return shippingAddressDto;
    }
}
