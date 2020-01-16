package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.ShippingAddress;
import com.paquery.packages.domain.ShippingSchedule;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;
import java.util.Date;

@Projection(name = "ShippingAddressProjection", types = {ShippingAddress.class})
public interface ShippingAddressProjection {

    long getId();

    String getAddressDetail();

    LocalDateTime getCreationDate();

    Double getLat();

    Double getLng();

    Boolean getActive();

    Boolean getDeleted();

    String getName();

    String getComment();

    String getGeoKey();
}
