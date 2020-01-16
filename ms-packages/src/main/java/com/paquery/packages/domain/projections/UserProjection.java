package com.paquery.packages.domain.projections;

import com.paquery.packages.domain.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "UserProjection" , types = {User.class})
public interface UserProjection {

    Long getId();

    String getMobile();

    String getName();

    String getLastName();

    String getAvatar();

    Integer getOwnerID();

    Integer getOwnerType();

    String getEmail();
}
