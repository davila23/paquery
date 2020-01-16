package com.paquery.maps.dao;

import com.paquery.maps.repositories.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PackageDao {

    @Autowired
    private PackageRepository packageRepository;
}
