package com.paquery.maps.repositories;

import com.paquery.maps.domain.ShippingAddress;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ShippingAddressRepository extends PagingAndSortingRepository<ShippingAddress, Long> {

}
