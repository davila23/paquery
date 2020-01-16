package com.paquery.maps.controllers;

        import com.paquery.maps.domain.DistributionZone;
        import com.paquery.maps.domain.Zone;
        import com.paquery.maps.domain.projections.DistributionZoneProjection;
        import com.paquery.maps.domain.projections.ZoneProjection;
        import com.paquery.maps.dto.DistributionZoneDto;
        import com.paquery.maps.dto.Response;
        import com.paquery.maps.dto.ZoneDto;
        import com.paquery.maps.services.DistributionZoneService;
        import com.paquery.maps.services.ZoneService;
        import org.slf4j.Logger;
        import org.slf4j.LoggerFactory;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.projection.ProjectionFactory;
        import org.springframework.http.ResponseEntity;
        import org.springframework.util.StringUtils;
        import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/distributionZone/")

public class DistributionZoneController {

    @Autowired
    private DistributionZoneService distributionZoneService;

    @Autowired
    private ProjectionFactory projectionFactory;

    private final static Logger logger = LoggerFactory.getLogger(PackageRouteController.class);

    /* ------  START : CRUD - DISTRIBUTION ZONE  ------ */

    @PostMapping
    public ResponseEntity createDistributionZone(@RequestBody DistributionZoneDto distributionZoneDto) {

        logger.info("POST /distributionZone");

        DistributionZone distributionZone = distributionZoneService.createDistributionZone(distributionZoneDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(DistributionZoneProjection.class, distributionZone)));
    }

    @GetMapping
    public ResponseEntity findAllDistributionZone(Pageable pageable, @RequestParam(name = "search", defaultValue = "") String search) {

        logger.info("GET /zone");

        Iterable<DistributionZone> s = distributionZoneService.getAllZone(search, pageable);

        return ResponseEntity.ok(Response.create(s));
    }

    @GetMapping("{id}")
    public ResponseEntity findDistributionZone(@PathVariable("id") Long id) {

        logger.info("GET /distributionZone({id}");

        DistributionZone distributionZone = distributionZoneService.getZoneById(id);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(DistributionZoneProjection.class, distributionZone)));
    }

    @PutMapping(value = "{id}")
    public ResponseEntity UpdateDistributionZone(@PathVariable("id") Long id, @RequestBody DistributionZoneDto distributionZoneDto) {

        logger.info("UPDATE /zone/{id}");

        if (id == null || id == 0)
            throw new RuntimeException("El ID no puede ser null o = 0");

        DistributionZone distributionZone = distributionZoneService.updateDistributionZone(id, distributionZoneDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(DistributionZoneProjection.class, distributionZone)));
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteDistributionZone(@PathVariable("id") Long id) {

        logger.info("DELETE /zone{id}");

        distributionZoneService.deleteDistributionZone(id);

        return ResponseEntity.noContent().build();
    }

    /* ------  END : CRUD - DISTRIBUTION ZONE  ------ */

    /* ------  OTHERS  ------ */

    @GetMapping("/resolveByAddress")
    public ResponseEntity resolveDistributionZone(@RequestParam("address") String address) {

        logger.info("GET /distributionZone/resolveDistributionZone");

        if (StringUtils.isEmpty(address))
            return ResponseEntity.badRequest().build();

        DistributionZone distributionZone = distributionZoneService.resolveDistributionZoneByAddress(address);
        return ResponseEntity.ok(Response.create(
                projectionFactory.createNullableProjection(DistributionZoneProjection.class, distributionZone)
        ));
    }
}
