package com.paquery.maps.domain.projections;

import com.paquery.maps.domain.DistributionZone;
import org.springframework.data.rest.core.config.Projection;

@Projection( name = "distributionZoneProjection", types = {DistributionZone.class})
public interface DistributionZoneProjection {

    Long getId();

    String getPostalCode();

    String getName();

}