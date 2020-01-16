package com.paquery.maps.controllers;

import com.paquery.maps.domain.Package;
import com.paquery.maps.domain.User;
import com.paquery.maps.domain.projections.PackageMinimalProjection;
import com.paquery.maps.domain.projections.UserMinimalProjection;
import com.paquery.maps.dto.Response;
import com.paquery.maps.repositories.PackageRepository;
import com.paquery.maps.repositories.ShippingScheduleRepository;
import com.paquery.maps.repositories.UserRepository;
import com.paquery.maps.services.PackageRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class MainController {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private ShippingScheduleRepository shippingScheduleRepository;
    @Autowired
    private PackageRouteService packageService;

    @GetMapping("/health")
    public ResponseEntity health() {
        Map map = new LinkedHashMap();
        map.put("time", new Date().toString());
        return ResponseEntity.ok(map);
    }

//    @GetMapping("/ping")
//    public ResponseEntity ping() {
//
//        List<Integer> r = new ArrayList();
//
//        for(int i=0; i< 100 ; ++i)
//            r.add(i);
//
//
//        List result = r.stream().filter(ent -> {
//            System.out.println("Entero: " + ent);
//            return ent < 20;
//        }).limit(10).collect(Collectors.toList());
//
//
//        return ResponseEntity.ok(result);
//    }

    @GetMapping("/shippings")
    public ResponseEntity getAll(Pageable pageable) {
        return ResponseEntity.ok(shippingScheduleRepository.findAll(pageable));
    }

    @GetMapping("/packages")
    public ResponseEntity getPackages(Pageable pageable) {
        Page<Package> page = packageRepository.findAll(pageable);
        return ResponseEntity.ok(page.map(pkg -> projectionFactory.createProjection(PackageMinimalProjection.class, pkg)));
    }


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectionFactory projectionFactory;

    @GetMapping("/users")
    public ResponseEntity getUser(Pageable pageable) {

        Iterable<User> usuarios = userRepository.findAll();

        List result = new ArrayList();

        for (User user : usuarios)
            result.add(projectionFactory.createProjection(UserMinimalProjection.class, user));

        return ResponseEntity.ok(
                Response.create(result)
        );
    }
}
