package com.paquery.packages.reports.controllers;

import com.paquery.packages.reports.services.ReportPackageService;
import com.paquery.security.SecuredApi;
import com.paquery.security.UserRoleEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/report")
public class ReportPackageController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private ReportPackageService reportPackageService;

    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_PAQUERYPOINT, UserRoleEnum.OPERATOR_PAQUERYPOINT})
    @GetMapping("/readyToExpirate")
    public ResponseEntity readyToExpirate() {
        logger.info("GET /report/readytToExpirate");
        List result = reportPackageService.getPackageInfoReadyToExpire();
        List headers = Arrays.asList(
                "ExternalCode",
                "Detalle",
                "Marketplace",
                "Estado",
                "Plazo",
                "FechaCreacion",
                "FechaArrivo",
                "FechaProgramada",
                "Visita1",
                "Visita2"

        );
        logger.info("GET /report/readytToExpirate => Result : {} paquetes", result.size());

        Map<String,Object> response = new HashMap<>();
        response.put("content", result);
        response.put("headers", headers);

        return ResponseEntity.ok(response);
    }

}
