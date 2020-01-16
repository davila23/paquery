package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.LogStatusPackage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDateTime;

@Projection(name = "logStatusPackagePickupProjection", types = {LogStatusPackage.class})
public interface LogStatusPackageProjection {

    LocalDateTime getCreationDate();

    @Value("#{target.resolveMessage()}")
    String getMessage();
}
