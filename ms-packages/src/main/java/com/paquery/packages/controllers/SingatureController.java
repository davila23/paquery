package com.paquery.packages.controllers;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.dto.PackageSignatureDto;
import com.paquery.commons.dto.Response;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.services.SignatureService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SingatureController {

    private static Logger logger = LoggerFactory.getLogger(SingatureController.class);

    @Autowired
    private SignatureService signatureService;

    @PostMapping("/sign/{packageID}/upload")
    public ResponseEntity signPackage(@PathVariable("packageID") PaqueryPackage paqueryPackage,
                                      @RequestBody PackageSignatureDto signatureDto) throws BusinessException {

        if (paqueryPackage == null)
            return ResponseEntity.notFound().build();

        logger.info("POST /sign/{}/upload", paqueryPackage.getId());

        signatureService.processSignature(paqueryPackage, signatureDto);

        return ResponseEntity.ok(Response.successMessage("La firma se guardo correctamente, el Paquete pasa al estado: entregado"));
    }
}
