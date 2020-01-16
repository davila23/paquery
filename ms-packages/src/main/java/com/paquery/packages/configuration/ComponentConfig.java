package com.paquery.packages.configuration;

import com.paquery.packages.utils.PathResolverUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

@Configuration
public class ComponentConfig {

    @Autowired
    private ApplicationContext applicationContext;

    @PostConstruct
    void setConfig() {
        PathResolverUtil.setAppEnviroment(applicationContext.getEnvironment());
    }
}
