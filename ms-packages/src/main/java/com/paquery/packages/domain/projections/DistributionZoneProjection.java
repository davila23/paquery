package com.paquery.packages.domain.projections;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.paquery.packages.domain.DistributionZone;
import com.paquery.packages.domain.LogStatusPackage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.Date;

@Projection(name = "distributionZoneProjection", types = {DistributionZone.class})
public interface DistributionZoneProjection {

    Long getId();

    String getName();

    String getPostalCode();

    Boolean getActive();

    Boolean getDeleted();

    @JsonProperty("description")
    @Value("#{target.getDescription()}")
    String getMessage();
}
