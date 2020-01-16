package com.paquery.packages.repositories;

import com.paquery.packages.domain.Visit;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface VisitRepository extends PagingAndSortingRepository<Visit, Long> {

//    @Query("SELECT vi FROM Visit vi " +
//            " where vi.active = true " +
//            " and vi.deleted=false " +
//            " and vi.shippingScheduleID =:shippingScheduleID ")
//    Set<Visit> getVisitsByShippingScheduleID(@Param("shippingScheduleID") Long shippingScheduleID);
}
