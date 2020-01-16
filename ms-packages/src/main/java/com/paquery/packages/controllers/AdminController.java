package com.paquery.packages.controllers;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.Response;
import com.paquery.commons.enums.StatusResult;
import com.paquery.packages.model.ResultCreatePackage;
import com.paquery.packages.services.PackageCreatorService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private static Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private PackageCreatorService packageCreatorService;

    @PostMapping("/packages")
    public ResponseEntity createPackage(@RequestBody PackageDto packageDto) {
        logger.info("POST admin/packages/  con externalCode: {}", packageDto.getExternalCode());
        ResultCreatePackage result = packageCreatorService.createPackage(packageDto);

        if (!result.getStatusResult().equals(StatusResult.OK)) {
            logger.error("Message: {}", result.getMessage());
            return ResponseEntity.unprocessableEntity().body(Response.error(result.getMessage(), 1));
        }

        return ResponseEntity.ok(Response.create(result));
    }
}
