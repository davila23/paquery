package com.paquery.maps.domain.projections;

import com.paquery.maps.domain.Package;
import com.paquery.maps.enums.PackageStatus;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "packageMinimalProjection", types = {Package.class})
public interface PackageMinimalProjection {

    long getId();

    String getCaption();

    String getDetail();

    String getExternalCode();

    PackageStatus getPackageStatus();

    int getPackageSize();

    int getPackageType();

}
