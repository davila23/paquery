package com.paquery.packages.controllers;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.Response;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.projections.*;

import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.external.services.CouponService;
import com.paquery.security.SecuredApi;
import com.paquery.packages.services.PackageService;
import com.paquery.packages.services.StoreWithdrawalPackageService;
import com.paquery.security.UserRoleEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/packages")
public class StoreWithdrawalController {

    private static Logger logger = LoggerFactory.getLogger(StoreWithdrawalController.class);

    @Autowired
    private StoreWithdrawalPackageService storeWithdrawalPackageService;

    @Autowired
    private PackageService packageService;

    @Autowired
    private ProjectionFactory projectionFactory;

    @Autowired
    private CouponService couponService;

    @GetMapping("/storeWithdrawal")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity findPackagesByStoreWithdrawal(Pageable pageable,
                                                        @RequestParam(name = "search", defaultValue = "") String search,
                                                        @RequestParam(name = "status") Integer status) {

        Page page = storeWithdrawalPackageService.getOriginPackagesFromStoreWithdrawal(search, status, pageable)
                .map(paqueryPackage -> projectionFactory.createProjection(PackageStoreWithdrawalProjection.class, paqueryPackage));

        return ResponseEntity.ok(Response.create(page));
    }

    @PostMapping("/storeWithdrawal")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity createStoreWithdrawalPackage(@RequestBody PackageDto packageDto) throws BusinessException {

        logger.info("POST /packages/storeWithdrawal con externalCode: {}", packageDto.getExternalCode());

        PaqueryPackage paqueryPackage = storeWithdrawalPackageService.createPackageWithIntegration(packageDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackageProjection.class, paqueryPackage)));
    }


    @GetMapping("/storeWithdrawal/findByExternalCode/{externalCode}")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity findByExternalCode(@PathVariable("externalCode") String externalCode) {

        List<PaqueryPackage> resultList = storeWithdrawalPackageService.findByExternalCode(externalCode);

        return ResponseEntity.ok(
                Response.create(resultList
                        .stream()
                        .map(p -> projectionFactory.createProjection(PackageMinimalProjection.class, p))
                        .collect(Collectors.toList()))
        );
    }

    @GetMapping("/storeWithdrawal/pendingSignature/{externalCode}")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity findByExternalCodePendingSignature(@PathVariable("externalCode") String externalCode) {

        List<PaqueryPackage> resultList = storeWithdrawalPackageService.findPendingSignatureByExternalCode(externalCode);

        return ResponseEntity.ok(
                Response.create(resultList
                        .stream()
                        .map(p -> projectionFactory.createProjection(PackageMinimalProjection.class, p))
                        .collect(Collectors.toList()))
        );
    }

    @GetMapping("/storeWithdrawal/history")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity findPackagesHistoryByStoreWithdrawal(Pageable pageable,
                                                               @RequestParam(name = "marketplaceID", required = false) Long marketplaceID,
                                                               @RequestParam(name = "search", defaultValue = "") String search,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(name = "sinceDate", required = false) LocalDate sinceDate,
                                                               @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                               @RequestParam(name = "toDate", required = false) LocalDate toDate) {

        logger.info("GET /packages/storeWithdrawal/history");

        Page page = storeWithdrawalPackageService.getOriginHistoryPackagesFromStoreWithdrawal(search,
                marketplaceID,
                sinceDate != null ? sinceDate.atStartOfDay() : null,
                toDate != null ? toDate.atStartOfDay().with(LocalTime.MAX) : null,
                pageable)
                .map(paqueryPackage -> projectionFactory.createProjection(PackageStoreWithdrawalProjection.class, paqueryPackage));

        return ResponseEntity.ok(Response.create(page));
    }

    @GetMapping("/storeWithdrawal/{id}")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity findPackageByID(@PathVariable("id") Long id) {

        logger.info("GET /packages/storeWithdrawal/{}", id);

        PaqueryPackage packageOrigin = storeWithdrawalPackageService.getPackageFromStoreWithdrawalByID(id);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackageProjection.class, packageOrigin)));
    }

    @DeleteMapping("/storeWithdrawal/{id}")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity deletePackageByID(@PathVariable("id") Long id) throws BusinessException {

        logger.info("DELETE /packages/storeWithdrawal/{}", id);

        packageService.calcelPackageByID(id);

        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/storeWithdrawal/{id}")
    @SecuredApi(allowedRoles = {UserRoleEnum.ADMIN, UserRoleEnum.ADMIN_MARKETPLACE, UserRoleEnum.OPERATOR_MARKETPLACE})
    public ResponseEntity UpdatePackage(@PathVariable("id") Long id, @RequestBody PackageDto packageDto) throws BusinessException {

        logger.info("PUT /packages/storeWithdrawal/{}", id);

        if (id == null || id == 0)
            throw new BusinessException("El ID no puede ser null o = 0");
        packageService.updatePackage(id, packageDto);

        return ResponseEntity.noContent().build();
    }

}
