package com.paquery.maps.repositories;

import com.paquery.maps.domain.ShippingSchedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ShippingScheduleRepository extends PagingAndSortingRepository<ShippingSchedule, Long> {
    @Query("SELECT ssche " +
           "FROM ShippingSchedule ssche " +
            "WHERE ssche.scheduleType=2 " +
            "and ssche.paqueryPackage.id = :packageID " +
            "and ssche.distributionZone is not null " +
            "and ssche.distributionZone.id <> 0")
    ShippingSchedule getShippingScheduleDestinationByPackageID(@Param("packageID") Long packageID);

    @Query("SELECT ssche FROM ShippingSchedule ssche WHERE ssche.paqueryPackage.id=:id and ssche.distributionZone <> null and ssche.distributionZone <> 0")
    Set<ShippingSchedule> getShippingSchedulesByPackageID(@Param("id") Long id);

    @Query("SELECT ssche FROM ShippingSchedule ssche WHERE ssche.scheduleType=2 and ssche.distributionZone.id=:id ")
    Set<ShippingSchedule> getShippingScheduleByDistributionZone(@Param("id") Long id);

    @Query("SELECT sh " +
            " FROM ShippingSchedule sh " +
            "   JOIN sh.paqueryPackage pkg" +
            " WHERE " +
            "      pkg.status in :status " +
            "      and sh.distributionZone.id = :distributionZonId" +
            "      and sh.paqueryPackage.id <> :packageID" +
            "      and sh.scheduleType = :scheduleType")
    Set<ShippingSchedule> findAllByDistributionZoneAndStatusPackageAndScheduleType(
            @Param("distributionZonId") Long distributionZonId,
            @Param("status") List<Integer> status,
            @Param("scheduleType") Integer scheduleType,
            @Param("packageID") Long packageID);

    @Query("SELECT sh " +
            " FROM ShippingSchedule sh " +
            "   JOIN sh.distributionZone.zones zones" +
            " WHERE " +
            "      sh.paqueryPackage.status in :status " +
            "      and sh.paquer is null " +
            "      and zones.id = :zoneId" +
            "      and sh.paqueryPackage.id <> :packageID" +
            "      and sh.scheduleType = :scheduleType")
    Set<ShippingSchedule> findAllByZoneAndStatusPackageAndScheduleType(
            @Param("zoneId") Long zoneId,
            @Param("status") List<Integer> status,
            @Param("scheduleType") Integer scheduleType,
            @Param("packageID") Long packageID);

    @Query("SELECT sh " +
            " FROM ShippingSchedule sh " +
            " JOIN FETCH sh.shippingAddress address" +
            " JOIN FETCH sh.paqueryPackage pkg" +
            " WHERE " +
            "      sh.paqueryPackage.id in :packagesID " +
            "      and sh.scheduleType = :scheduleType")
    Set<ShippingSchedule> getShippingsAndAddressByPackageID(
            @Param("packagesID") List<Long> packagesID,
            @Param("scheduleType") Integer scheduleType);
}
