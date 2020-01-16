package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.Paquer;
import com.paquery.packages.domain.Visit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "PaquerProjection", types = {Paquer.class})
public interface PaquerProjection {

    Long getId();

    String getName();

    String getEmail();

    Long getDocNumber();

    String getCode();

    @Value("#{T(com.paquery.packages.utils.PathResolverUtil).resolvePaquerAvatarPath(target.id,target.avatar)}")
    String getAvatar();
}
