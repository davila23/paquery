package com.paquery.packages.repositories;

import com.paquery.packages.domain.ShippingAddress;
import com.paquery.packages.domain.ShippingSchedule;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepository extends PagingAndSortingRepository<ShippingAddress, Long> {

}
