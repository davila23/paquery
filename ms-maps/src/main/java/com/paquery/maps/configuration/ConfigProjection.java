package com.paquery.maps.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

@Configuration
public class ConfigProjection {

    @Bean
    ProjectionFactory getProjectionFactory() {
        return new SpelAwareProxyProjectionFactory();
    }

}
