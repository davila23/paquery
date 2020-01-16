package com.paquery.maps.services;

import com.paquery.maps.dao.DistributionZoneDao;
import com.paquery.maps.domain.DistributionZone;
import com.paquery.maps.domain.ShippingAddress;
import com.paquery.maps.dto.DistributionZoneDto;
import com.paquery.maps.dto.location.LocationAddress;
import com.paquery.maps.map.services.IMapAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;

@Service
public class DistributionZoneService {


    @Autowired
    private IMapAddressService mapAddressService;

    @Autowired
    private DistributionZoneDao distributionZoneDao;


    @Transactional
    public DistributionZone createDistributionZone(DistributionZoneDto distributionZoneDto) {

        DistributionZone zone = mapDistributionZone(distributionZoneDto);

        distributionZoneDao.save(zone);

        return zone;
    }

    public Iterable<DistributionZone> getAllZone(String search, Pageable pageable) {

        return distributionZoneDao.getAll(search, pageable);
    }

    public DistributionZone getZoneById(Long id) {

        return distributionZoneDao.getById(id);
    }

    public DistributionZone updateDistributionZone(Long id, DistributionZoneDto distributionZoneDto) {

        DistributionZone distributionZone_ = distributionZoneDao.getById(id);

        if (distributionZone_ == null)
            throw new EntityNotFoundException("No existe Zona con id: " + id);

        DistributionZone distributionZone = mapDistributionZone(distributionZoneDto);

        return distributionZoneDao.update(distributionZone);
    }

    public void deleteDistributionZone(Long id) {

        distributionZoneDao.delete(id);

    }

    private DistributionZone mapDistributionZone(DistributionZoneDto distributionZoneDto) {

        DistributionZone distributionZone = new DistributionZone();

        if (distributionZoneDto.getId() != null) distributionZone.setId(distributionZoneDto.getId());
        distributionZone.setActive(distributionZoneDto.getActive());
        distributionZone.setDeleted(distributionZoneDto.getDeleted());
        distributionZone.setName(distributionZoneDto.getName());
        distributionZone.setPostalCode(distributionZoneDto.getPostalCode());
        distributionZone.setZones(distributionZoneDto.getZones());

        return distributionZone;
    }

    public ShippingAddress resolveDistributionZone(ShippingAddress shippingAddress) {

        return new ShippingAddress();
    }

    public DistributionZone resolveDistributionZoneByAddress(String address) {

        LocationAddress locationAddress = mapAddressService.resolveLocation(address);

        if (locationAddress == null || StringUtils.isEmpty(locationAddress.getPostalCode()))
            return null;

        return distributionZoneDao.findDistributionZoneByPostalCode(locationAddress.getPostalCode());
    }
}
