package com.paquery.maps.controllers;

import com.paquery.maps.dto.PackageDto;
import com.paquery.maps.dto.Response;
import com.paquery.maps.exception.NotFoundPackageException;
import com.paquery.maps.services.PackageRouteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/route")
public class PackageRouteController {

    private final static Logger logger = LoggerFactory.getLogger(PackageRouteController.class);
    @Autowired
    private PackageRouteService packageRouteService;

    @Autowired
    private ProjectionFactory projectionFactory;

    @GetMapping("/similarDestination/{id}")
    public ResponseEntity routePackages(@PathVariable("id") Long packageId) throws NotFoundPackageException {

        logger.info("GET /route/similarDestination/[id:{}]", packageId);

        if (packageId == 0 || packageId == null)
            throw new NotFoundPackageException("El id es no puede ser null o 0");

        Set<PackageDto> packages = packageRouteService.getPackagesBySimilarDestination(packageId);
        return ResponseEntity.ok(Response.create(packages));
    }
}
