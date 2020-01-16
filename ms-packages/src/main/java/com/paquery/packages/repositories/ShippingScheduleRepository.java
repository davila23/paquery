package com.paquery.packages.repositories;

import com.paquery.packages.domain.ShippingSchedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShippingScheduleRepository extends PagingAndSortingRepository<ShippingSchedule, Long> {

    @Query("SELECT ssche FROM ShippingSchedule ssche" +
//            " WHERE ssche.scheduleType=2 " +
            " WHERE ssche.paqueryPackage.id=:id ")
            List<ShippingSchedule> getShippingScheduleByPackageID(@Param("id") Long id);

    @Query("SELECT ssche FROM ShippingSchedule ssche " +
            " join fetch ssche.paqueryPackage pack " +
            " left join ssche.visits vi " +
            " where ssche.id=:shippingScheduleID " +
            " and ssche.scheduleType =:scheduleType ")
    ShippingSchedule getShippingScheduleVisistsByID(@Param("shippingScheduleID") Long shippingScheduleID,
                                                           @Param("scheduleType") Integer scheduleType);
    @Query("SELECT ssche FROM ShippingSchedule ssche " +
            " WHERE ssche.scheduleType=:scheduleType " +
            " and ssche.paqueryPackage.id=:id ")
    ShippingSchedule getShippingScheduleByPackageID(@Param("id") Long id
            , @Param("scheduleType") Integer scheduleType);

}
