package com.paquery.maps.map.here.response.proyections;


import com.paquery.maps.domain.User;
import com.paquery.maps.map.here.response.AddressHere;
import com.paquery.maps.map.here.response.PositionHere;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "userMinimalProjection", types = {User.class})
public interface LocationMinimalProjection {

    AddressHere getAddress();

    PositionHere getDisplayPosition();
}
