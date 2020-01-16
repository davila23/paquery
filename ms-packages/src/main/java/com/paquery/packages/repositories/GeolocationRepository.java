package com.paquery.packages.repositories;

import com.paquery.packages.domain.Geolocation;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeolocationRepository extends PagingAndSortingRepository<Geolocation, Long> {

}
