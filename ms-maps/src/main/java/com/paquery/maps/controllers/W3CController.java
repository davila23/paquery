package com.paquery.maps.controllers;

import com.paquery.maps.dto.Response;
import com.paquery.maps.w3w.response.services.W3wService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class W3CController {

    @Autowired
    private W3wService w3WService;

    @GetMapping("/w3w/address")
    public ResponseEntity getw3wByCoords(@RequestParam("address") String address) {
        return ResponseEntity.ok(Response.create(w3WService.getW3wByCoords(address)));
    }

    @GetMapping("/w3w/words")
    public ResponseEntity getw3wByWords(@RequestParam("word") String words) {
        return ResponseEntity.ok(Response.create(w3WService.getW3wByWords(words)));
    }

    @GetMapping("/w3w/geo")
    public ResponseEntity getw3wByGeo(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng) {
        return ResponseEntity.ok(Response.create(w3WService.getW3wByGeo(lat, lng)));
    }
}
