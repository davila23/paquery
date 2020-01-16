package com.paquery.maps.repositories;

import com.paquery.maps.domain.Package;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PackageRepository extends PagingAndSortingRepository<Package, Long> {
    @Query("SELECT pack FROM Package pack WHERE pack.id=:id")
    Set<Package> filterAllPackagesByDistributionZone(@Param("id") Long id);
}
