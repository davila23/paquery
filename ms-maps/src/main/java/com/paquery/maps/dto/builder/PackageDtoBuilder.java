package com.paquery.maps.dto.builder;

import com.paquery.maps.domain.Package;
import com.paquery.maps.dto.PackageDto;
import com.paquery.maps.dto.ShippingScheduleDto;

public class PackageDtoBuilder {

    public PackageDto PackageBuilder(Package pack, ShippingScheduleDto origin, ShippingScheduleDto destination) {
        PackageDto packageDto = new PackageDto(pack);

        packageDto.setShippingScheduleDestination(destination);
        packageDto.setShippingScheduleOrigin(origin);
        return packageDto;
    }

}
