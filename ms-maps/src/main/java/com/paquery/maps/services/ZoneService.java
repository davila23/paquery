package com.paquery.maps.services;

import com.paquery.maps.dao.ZoneDao;
import com.paquery.maps.domain.Zone;
import com.paquery.maps.dto.ZoneDto;
import com.paquery.maps.map.services.IMapAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Service
public class ZoneService {

    @Autowired
    private IMapAddressService mapAddressService;

    @Autowired
    private ZoneDao zoneDao;

    @Transactional
    public Zone createZone(ZoneDto zoneDto) {

        Zone zone = mapZone(zoneDto);

        zoneDao.save(zone);

        return zone;
    }

    public Iterable<Zone> getAllZone(String search, Pageable pageable) {

        return zoneDao.getAll(search, pageable);
    }

    public Zone getZoneById(Long id) {

        return zoneDao.getById(id);
    }


    public Zone updateZone(Long id, ZoneDto zoneDto) {

        Zone zone_ = zoneDao.getById(id);

        if (zone_ == null)
            throw new EntityNotFoundException("No existe Zona con id: " + id);

        Zone zone = mapZone(zoneDto);

        return zoneDao.update(zone);

    }

    public void deleteZone(Long id) {

        zoneDao.delete(id);
    }


    private Zone mapZone(ZoneDto zoneDto) {

        Zone zone = new Zone();

        if (zoneDto.getName() != null) zone.setId(zoneDto.getId());
        zone.setName(zoneDto.getName());
        zone.setActive(zoneDto.getActive());
        zone.setCode(zoneDto.getCode());
        zone.setDeleted(zoneDto.getDeleted());
        zone.setDetail(zoneDto.getDetail());
        zone.setGeometry(zoneDto.getGeometry());

        return zone;
    }
}
