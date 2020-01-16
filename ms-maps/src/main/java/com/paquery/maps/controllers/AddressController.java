package com.paquery.maps.controllers;

import com.paquery.maps.dto.Response;
import com.paquery.maps.map.here.response.proyections.LocationMinimalProjection;
import com.paquery.maps.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;
    @Autowired
    private ProjectionFactory projectionFactory;

    @GetMapping("/address/validate")
    public ResponseEntity validateAddress(@RequestParam("address") String address) {

        return ResponseEntity.ok(
                Response.create(
                        projectionFactory.createProjection(
                                LocationMinimalProjection.class, addressService.validateAddress(address))));
    }

    @GetMapping("/address/autocomplete")
    public ResponseEntity autocompleteAddress(@RequestParam("partialAddress") String partialAddress) {

        return ResponseEntity.ok(
                Response.create(
                        addressService.autocompleteAddress(partialAddress)));
    }
}
