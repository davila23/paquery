package com.paquery.maps.repositories;

import com.paquery.maps.domain.DistributionZone;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistributionZoneRepository extends PagingAndSortingRepository<DistributionZone, Long> {

    @Query("select dz from DistributionZone dz " +
           "where  dz.postalCode = :postalCode " +
           "   and dz.active = true and ( dz.deleted is null or dz.deleted = false )")
    Optional<DistributionZone> findByPostalCode(@Param("postalCode") String postalCode);

}
