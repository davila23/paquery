package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.PaqueryPackage;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "packageProjection", types = {PaqueryPackage.class})
public interface PackageStoreWithdrawalProjection extends PackageProjection {

}
