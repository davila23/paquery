package com.paquery.packages.controllers;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.projections.PackageMinimalProjection;
import com.paquery.packages.domain.projections.PackagePickupByIDProjection;
import com.paquery.packages.domain.projections.PackagePickupProjection;
import com.paquery.packages.domain.projections.PackageProjection;
import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.Response;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.external.enums.ResultStatusEnum;
import com.paquery.packages.external.services.CouponService;
import com.paquery.security.SecuredApi;
import com.paquery.packages.services.PackageService;
import com.paquery.packages.services.PickUpPackageService;
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
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/packages")
public class PickUpController {

    private static Logger logger = LoggerFactory.getLogger(PickUpController.class);

    @Autowired
    private PickUpPackageService pickUpPackageService;

    @Autowired
    private PackageService packageService;

    @Autowired
    private ProjectionFactory projectionFactory;

    @Autowired
    private CouponService couponService;

    @GetMapping("/pickup")
    @SecuredApi
    public ResponseEntity findPackagesByPickup(Pageable pageable,
                                               @RequestParam(name = "search", defaultValue = "") String search,
                                               @RequestParam(name = "status") Integer status) {
        Page page = pickUpPackageService.getPackagesFromPickup(search, status, pageable)
                .map(paqueryPackage -> projectionFactory.createProjection(PackagePickupProjection.class, paqueryPackage));
        return ResponseEntity.ok(Response.create(page));
    }

    @SecuredApi
    @PostMapping("/pickup")
    public ResponseEntity createPickupPackage(@RequestBody PackageDto packageDto) throws BusinessException {
        logger.info("POST /packages/pickup con externalCode: {}", packageDto.getExternalCode());

        PaqueryPackage paqueryPackage = pickUpPackageService.createPackageWithIntegration(packageDto);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackageProjection.class, paqueryPackage)));
    }

    @SecuredApi
    @GetMapping("/pickup/findByExternalCode/{externalCode}")
    public ResponseEntity findByExternalCode(@PathVariable("externalCode") String externalCode) {
        List<PaqueryPackage> resultList = pickUpPackageService.findByExternalCode(externalCode);
        return ResponseEntity.ok(
                Response.create(resultList
                        .stream()
                        .map(p -> projectionFactory.createProjection(PackageMinimalProjection.class, p))
                        .collect(Collectors.toList()))
        );
    }

    @SecuredApi
    @GetMapping("/pickup/pendingSignature/{externalCode}")
    public ResponseEntity findByExternalCodePendingSignature(@PathVariable("externalCode") String externalCode) {
        List<PaqueryPackage> resultList = pickUpPackageService.findPendingSignatureByExternalCode(externalCode);
        return ResponseEntity.ok(
                Response.create(resultList
                        .stream()
                        .map(p -> projectionFactory.createProjection(PackageMinimalProjection.class, p))
                        .collect(Collectors.toList()))
        );
    }


    @GetMapping("/pickup/history")
    public ResponseEntity findPackagesHistoryByPickup(Pageable pageable,
                                                      @RequestParam(name = "marketplaceID", required = false) Long marketplaceID,
                                                      @RequestParam(name = "search", defaultValue = "") String search,
                                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                      @RequestParam(name = "sinceDate", required = false) LocalDate sinceDate,
                                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                      @RequestParam(name = "toDate", required = false) LocalDate toDate) {
        logger.info("GET /packages/pickup/history");
        Page page = pickUpPackageService.getOriginHistoryPackagesFromPickup(search,
                marketplaceID,
                sinceDate != null ? sinceDate.atStartOfDay() : null,
                toDate != null ? toDate.atStartOfDay().with(LocalTime.MAX) : null,
                pageable)
                .map(paqueryPackage -> projectionFactory.createProjection(PackagePickupProjection.class, paqueryPackage));
        return ResponseEntity.ok(Response.create(page));
    }

    @GetMapping("/pickup/{id}")
    public ResponseEntity findPackageByID(@PathVariable("id") Long id) {
        logger.info("GET /packages/pickup/{}", id);
        PaqueryPackage paqueryPackage = pickUpPackageService.getOriginPackageFromPickupByID(id);
        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackagePickupByIDProjection.class, paqueryPackage)));
    }

    @DeleteMapping("/pickup/{id}")
    public ResponseEntity deletePackageByID(@PathVariable("id") Long id) throws BusinessException {
        logger.info("DELETE /packages/pickup/{}", id);
        packageService.calcelPackageByID(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/pickup/{id}")
    public ResponseEntity UpdatePickupPackage(@PathVariable("id") Long id, @RequestBody PackageDto packageDto) throws
            BusinessException {
        logger.info("PUT /packages/pickup/{}", id);
        if (id == null || id == 0)
            throw new BusinessException("El ID no puede ser null o = 0");
        pickUpPackageService.updatePickupPackage(id, packageDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/pickup/{packageID}/checkCoupon")
    public ResponseEntity validateCoupon(@PathVariable("packageID") PaqueryPackage paqueryPackage) throws Exception {

        if (paqueryPackage == null)
            return ResponseEntity.notFound().build();

        logger.info("GET /pickup/[{}]/checkCoupon", paqueryPackage.getId());

        Map result = couponService.checkCoupon(paqueryPackage);
        mapStateFromExternalService(result);
        return ResponseEntity.ok(Response.create(result));
    }

    @GetMapping(value = "/pickup/{packageID}/redeemCoupon")
    public ResponseEntity redeemCoupon(@PathVariable("packageID") PaqueryPackage paqueryPackage) throws Exception {

        if (paqueryPackage == null)
            return ResponseEntity.notFound().build();

        logger.info("GET /pickup/[{}]/redeemCoupon", paqueryPackage.getId());

        Map result = couponService.redeemCoupon(paqueryPackage);

        ResultStatusEnum resultStatus = mapStateFromExternalService(result);

        if (ResultStatusEnum.VALID.equals(resultStatus)) {
            pickUpPackageService.deliveredPendingSignature(paqueryPackage);
            result.put("package", projectionFactory.createProjection(PackagePickupProjection.class, paqueryPackage));
        }


        return ResponseEntity.ok(Response.create(result));
    }

    private ResultStatusEnum mapStateFromExternalService(Map resultExternalService) {
        ResultStatusEnum resultStatus = ResultStatusEnum.parse(resultExternalService.get("status").toString());

        resultExternalService.put("status", resultStatus.getValue());
        resultExternalService.put("statusDetail", resultStatus.getStrValue());
        resultExternalService.put("statusDescription", resultStatus.getDescription());

        return resultStatus;
    }


}
