package com.paquery.maps.dao;

import com.paquery.maps.domain.ShippingSchedule;
import com.paquery.maps.domain.Zone;
import com.paquery.maps.enums.PackageStatus;
import com.paquery.maps.enums.ScheduleType;
import com.paquery.maps.repositories.ShippingScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ShippingScheduleDao {
    @Autowired
    private ShippingScheduleRepository shippingScheduleRepository;

    public ShippingSchedule getShippingScheduleByPackageID(Long pacakgeID) {
        return shippingScheduleRepository.getShippingScheduleDestinationByPackageID(pacakgeID);
    }

    public Set<ShippingSchedule> getShippingScheduleByDistributionZone(Long id) {
        return shippingScheduleRepository.getShippingScheduleByDistributionZone(id);
    }

    public Set<ShippingSchedule> filterShippingSchedule(Long distributionZoneId, List<PackageStatus> statusList, ScheduleType scheduleType, Long packageID) {
        return shippingScheduleRepository.findAllByDistributionZoneAndStatusPackageAndScheduleType(distributionZoneId,
                statusList.stream().map(PackageStatus::getValue).collect(Collectors.toList()), scheduleType.getValue(), packageID);
    }

    public Set<ShippingSchedule> filterShippingSchedule(Zone zone, List<PackageStatus> statusList, ScheduleType scheduleType, Long packageID) {
        return shippingScheduleRepository.findAllByZoneAndStatusPackageAndScheduleType(zone.getId(),
                statusList.stream().map(PackageStatus::getValue).collect(Collectors.toList()), scheduleType.getValue(), packageID);
    }

    public Set<ShippingSchedule> getShippingSchedulesByPackageID(Long id) {
        return shippingScheduleRepository.getShippingSchedulesByPackageID(id);
    }

    public Set<ShippingSchedule> getShippingSchedulesByPackageID(List<Long> packagesID, ScheduleType scheduleType) {
        return shippingScheduleRepository.getShippingsAndAddressByPackageID(packagesID, scheduleType.getValue());
    }
}
