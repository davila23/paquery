package com.paquery.maps.configuration;

import com.google.common.cache.CacheBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@EnableCaching
@Configuration
public class CacheConfiguration extends CachingConfigurerSupport {

    public static final String CACHE_W3W = "cacheW3w";
    public static final String CACHE_HERE = "cacheHere";

    @Value("${paquery.cache.defaultExpirationTime:30}")
    private Integer defaultExpirationTime;

    @Value("${paquery.cache.defaultMaxElements:1000}")
    private Integer defaultMaxElements;

    @Override
    public CacheManager cacheManager() {
        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager() {

            @Override
            protected Cache createConcurrentMapCache(final String name) {
                return new ConcurrentMapCache(name,
                        CacheBuilder.newBuilder()
                                .expireAfterWrite(defaultExpirationTime, TimeUnit.MINUTES)
                                .maximumSize(defaultMaxElements)
                                .build()
                                .asMap(), false);
            }
        };

        return cacheManager;
    }
}
