package com.paquery.packages.dao;

import com.paquery.packages.domain.DistributionZone;
import com.paquery.packages.repositories.DistributionZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DistributionZoneDao {

    @Autowired
    private DistributionZoneRepository distributionZoneRepository;

    public DistributionZone getDistributionZoneByID(Long distrobutionZoneID) {
        return distributionZoneRepository.findById(distrobutionZoneID).get();
    }
}
