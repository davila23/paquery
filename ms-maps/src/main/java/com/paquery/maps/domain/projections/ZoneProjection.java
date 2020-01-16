package com.paquery.maps.domain.projections;

import com.paquery.maps.domain.Zone;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "ZoneProjection", types = {Zone.class})
public interface ZoneProjection {

    Long getId();

    String getName();

    String getCode();

    String getGeometry();

    Boolean getDeleted();

    Boolean getActive();

    String getDetail();


}
