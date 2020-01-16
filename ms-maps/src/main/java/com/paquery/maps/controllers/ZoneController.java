package com.paquery.maps.controllers;

import com.paquery.maps.domain.Zone;
import com.paquery.maps.domain.projections.ZoneProjection;
import com.paquery.maps.dto.Response;
import com.paquery.maps.dto.ZoneDto;
import com.paquery.maps.services.ZoneService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/zone/")
public class ZoneController {

    private final static Logger logger = LoggerFactory.getLogger(PackageRouteController.class);
    @Autowired
    private ZoneService zoneService;
    @Autowired
    private ProjectionFactory projectionFactory;


    /* ------  START : CRUD -  ZONE  ------ */

    @PostMapping
    public ResponseEntity createZone(@RequestBody ZoneDto zoneDto) {

        logger.info("POST /zone");

        Zone zone = zoneService.createZone(zoneDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(ZoneProjection.class, zone)));
    }

    @GetMapping
    public ResponseEntity findAllZones(Pageable pageable, @RequestParam(name = "search", defaultValue = "") String search) {

        logger.info("GET /zone");

        Iterable<Zone> s = zoneService.getAllZone(search, pageable);

        return ResponseEntity.ok(Response.create(s));
    }

    @GetMapping("{id}")
    public ResponseEntity findZoneByID(@PathVariable("id") Long id) {

        logger.info("GET /zone({id}");

        Zone zone = zoneService.getZoneById(id);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(ZoneProjection.class, zone)));
    }


    @PutMapping(value = "{id}")
    public ResponseEntity UpdateZone(@PathVariable("id") Long id, @RequestBody ZoneDto zoneDto) {

        logger.info("UPDATE /zone/{id}");

        if (id == null || id == 0)
            throw new RuntimeException("El ID no puede ser null o = 0");

        Zone zone = zoneService.updateZone(id, zoneDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(ZoneProjection.class, zone)));
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteZoneByID(@PathVariable("id") Long id) {

        logger.info("DELETE /zone{id}");

        zoneService.deleteZone(id);

        return ResponseEntity.noContent().build();
    }

    /* ------  END : CRUD -  ZONE  ------ */

}
