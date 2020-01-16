package com.paquery.maps.dao;

import com.paquery.maps.domain.ShippingAddress;
import com.paquery.maps.repositories.ShippingAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ShippingAddressDao {
    @Autowired
    private ShippingAddressRepository shippingAddressRepository;

    public ShippingAddress getByID(Long id) {

        Optional<ShippingAddress> shippingAddress = shippingAddressRepository.findById(id);
        if (shippingAddress.isPresent())
            return shippingAddress.get();
        else
            return null;
    }
}
