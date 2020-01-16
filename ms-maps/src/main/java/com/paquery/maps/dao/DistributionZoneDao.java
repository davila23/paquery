package com.paquery.maps.dao;

import com.paquery.maps.domain.DistributionZone;
import com.paquery.maps.repositories.DistributionZoneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DistributionZoneDao {

    private static Logger logger = LoggerFactory.getLogger(ZoneDao.class);
    @Autowired
    private DistributionZoneRepository distributionZoneRepository;

    public DistributionZone save(DistributionZone zone) {

        logger.info("POST : Distribution Zone");

        return this.distributionZoneRepository.save(zone);
    }

    public Iterable<DistributionZone> getAll(String search, Pageable pageable) {

        logger.info("GET ALL : Distribution Zone");

        return this.distributionZoneRepository.findAll();
    }

    public DistributionZone getById(Long id) {

        logger.info("GET : Distribution Zone");

        Optional<DistributionZone> distributionZone_ = this.distributionZoneRepository.findById(id);

        if (distributionZone_.isPresent()) {

            DistributionZone zone = distributionZone_.get();
            return zone;
        }
        return null;
    }

    public DistributionZone update(DistributionZone distributionZone) {

        logger.info("UPDATE : Distribution Zone");

        return this.distributionZoneRepository.save(distributionZone);
    }

    public void delete(Long id) {

        logger.info("DELETE : Distribution Zone");

        this.distributionZoneRepository.deleteById(id);
    }

    public DistributionZone findDistributionZoneByPostalCode(String postalCode) {

        logger.info("GET : Distribution Zone By Postal Code");

        Optional<DistributionZone> distZone = distributionZoneRepository.findByPostalCode(postalCode);

        return distZone.orElse(null);
    }

}
