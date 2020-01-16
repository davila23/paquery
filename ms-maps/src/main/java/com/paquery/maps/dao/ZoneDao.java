package com.paquery.maps.dao;

import com.paquery.maps.domain.Zone;
import com.paquery.maps.repositories.ZoneRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ZoneDao {

    private static Logger logger = LoggerFactory.getLogger(ZoneDao.class);

    @Autowired
    private ZoneRepository zoneRepository;

    public Zone save(Zone zone) {

        logger.info("POST : Zone");

        return this.zoneRepository.save(zone);
    }

    public Iterable<Zone> getAll(String search, Pageable pageable) {

        logger.info("GET : All Zone ");

        return this.zoneRepository.findAll();

    }

    public Zone getById(Long id) {

        logger.info("GET : Zone id :" + id);

        Optional<Zone> zone_ = this.zoneRepository.findById(id);

        if (zone_.isPresent()) {

            Zone zone = zone_.get();
            return zone;

        }

        return null;

    }

    public Zone update(Zone zone) {

        logger.info("Update : Zone");

        return this.zoneRepository.save(zone);
    }

    public void delete(Long id) {

        logger.info("DELETE : Zone id :" + id);

        this.zoneRepository.deleteById(id);

    }
}
