package com.paquery.maps.repositories;

import com.paquery.maps.domain.DistributionZone;
import com.paquery.maps.domain.Package;
import com.paquery.maps.domain.Zone;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends PagingAndSortingRepository<Zone, Long> {

    @Query(
            " SELECT zToDz.distributionZone " +
            " FROM ZoneToDistributionZone zToDz " +
            "   JOIN zToDz.zone z " +
            " WHERE zToDz.active = true " +
            "       and ( zToDz.deleted is null or zToDz.deleted = false ) " +
            "       and z = :zone "
    )
    List<DistributionZone> findAllDistributionZoneByZone(@Param("zone") Zone zone);

}
