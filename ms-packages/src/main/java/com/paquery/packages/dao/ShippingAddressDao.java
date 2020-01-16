package com.paquery.packages.dao;

import com.paquery.packages.domain.ShippingAddress;
import com.paquery.packages.repositories.ShippingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShippingAddressDao {

    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    public ShippingAddress saveShippingAddress(ShippingAddress shippingAddress) {
        return shippingAddressRepository.save(shippingAddress);
    }
}
