package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "packageProjection", types = {PaqueryPackage.class})
public interface PackagePickupProjection extends PackageMinimalProjection {

    ShippingSchedulePickupProjection getShippingScheduleOrigin();

    User getUser();
}
