package com.paquery.packages.external.controllers;

import com.paquery.packages.external.dao.ExternalServiceCredentialsDao;
import com.paquery.packages.external.domain.ExternalServiceCredentials;
import com.paquery.packages.external.dto.ExternalServiceDto;
import com.paquery.security.SecuredApi;
import com.paquery.security.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ExternalServiceController {

    @Autowired
    private ExternalServiceCredentialsDao serviceCredentialsDao;

    @SecuredApi(allowedRoles = UserRoleEnum.ADMIN)
    @PostMapping("/externalService")
    public ResponseEntity createExternalService(@RequestBody ExternalServiceDto externalServiceDto) {
        serviceCredentialsDao.create(externalServiceDto);
        return ResponseEntity.ok().build();
    }

    @SecuredApi(allowedRoles = UserRoleEnum.ADMIN)
    @GetMapping("/externalService/{externalServiceID}")
    public ResponseEntity getExternalService(@PathVariable("externalServiceID")ExternalServiceCredentials externalServiceCredentials) {
        if (externalServiceCredentials == null)
            return ResponseEntity.notFound().build();

        // TODO: cambiar por projection
        return ResponseEntity.ok(externalServiceCredentials);
    }

}
