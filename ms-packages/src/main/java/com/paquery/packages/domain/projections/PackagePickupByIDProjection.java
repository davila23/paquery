package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.PaqueryPackage;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "packageByIDProjection", types = {PaqueryPackage.class})
public interface PackagePickupByIDProjection extends PackagePickupProjection {

    Set<LogStatusPackageProjection> getLogStatusPackages();

    ShippingSchedulePickupProjection getShippingScheduleDestination();
}
