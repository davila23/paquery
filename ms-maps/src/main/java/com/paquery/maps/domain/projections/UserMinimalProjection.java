package com.paquery.maps.domain.projections;


import com.paquery.maps.domain.User;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userMinimalProjection", types = {User.class})
public interface UserMinimalProjection {

    Long getId();

    String getName();

    String getEmail();
}
