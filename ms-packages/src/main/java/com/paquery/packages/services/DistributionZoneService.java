package com.paquery.packages.services;

import com.paquery.packages.dao.DistributionZoneDao;
import com.paquery.packages.domain.DistributionZone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class DistributionZoneService {

    @Autowired
    private DistributionZoneDao distributionZoneDao;

    public DistributionZone getDistributionZoneByID(Long distributionZoneID) {
        return distributionZoneDao.getDistributionZoneByID(distributionZoneID);
    }
}
