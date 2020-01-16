package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import org.springframework.data.rest.core.config.Projection;

import java.util.Set;

@Projection(name = "packageProjection", types = {PaqueryPackage.class})
public interface PackageProjection extends PackageMinimalProjection {

    ShippingScheduleProjection getShippingScheduleOrigin();

    ShippingScheduleProjection getShippingScheduleDestination();

    Set<LogStatusPackageProjection> getLogStatusPackages();

    UserProjection getUser();
}
