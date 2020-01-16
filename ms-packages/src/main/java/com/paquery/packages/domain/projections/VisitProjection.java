package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.Visit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "VisitProjection", types = {Visit.class})
public interface VisitProjection {

    Long getId();

    @Value("#{T(com.paquery.packages.utils.PathResolverUtil).resolveVisitPath(target.getCurrentPackage().getId(),target.photo)}")
    String getPhoto();

    String getReason();

    Integer getNumberVisit();
}
