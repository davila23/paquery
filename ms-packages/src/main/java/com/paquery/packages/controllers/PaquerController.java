package com.paquery.packages.controllers;

import com.paquery.commons.dto.Response;
import com.paquery.commons.dto.VisitDto;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.projections.PackageProjection;
import com.paquery.packages.enums.FilterHistoryEnum;
import com.paquery.packages.model.AcceptPackagesByPaquerRequest;
import com.paquery.packages.services.PackageStatusService;
import com.paquery.packages.services.PaquerService;
import com.paquery.security.SecuredApi;
import com.paquery.security.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@CrossOrigin
@RestController
@RequestMapping("/paquer")
public class PaquerController {

    @Autowired
    private PaquerService paquerService;

    @Autowired
    private PackageStatusService packageStatusService;

    @Autowired
    private ProjectionFactory projectionFactory;

    @SecuredApi(allowedRoles = UserRoleEnum.PAQUER)
    @PostMapping("/acceptpackages")
    public ResponseEntity addPackagesByPaquer(@RequestBody AcceptPackagesByPaquerRequest driverRequest) throws BusinessException {
        paquerService.acceptPackagesByPaquer(driverRequest);
        return ResponseEntity.noContent().build();
    }

    @SecuredApi(allowedRoles = UserRoleEnum.PAQUER)
    @GetMapping("/history")
    public ResponseEntity historyByPaquer(Pageable pageable,
                                          @RequestParam(value = "filter", required = false) Integer filterHistory,
                                          @RequestParam(value = "sinceDate", required = false)
                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate sinceDate,
                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                          @RequestParam(value = "toDate", required = false) LocalDate toDate
    ) {

        Page page = paquerService.packagesHistoryByPaquerID(pageable,
                FilterHistoryEnum.valueOf(filterHistory),
                sinceDate != null ? sinceDate.atStartOfDay() : null,
                toDate != null ? toDate.atStartOfDay().with(LocalTime.MAX) : null)
                .map(paqueryPackage -> projectionFactory.createProjection(PackageProjection.class, paqueryPackage));


        return ResponseEntity.ok(Response.create(page));
    }

    @SecuredApi(allowedRoles = UserRoleEnum.PAQUER)
    @PutMapping("visit")
    public ResponseEntity visit(@RequestBody VisitDto visitDto) throws BusinessException {

        paquerService.setVisit(visitDto);

        return ResponseEntity.noContent().build();
    }

    @SecuredApi
    @PutMapping("/unassign/{packageID}")
    public ResponseEntity unassignPaquer(@PathVariable("packageID") Long packageID) throws BusinessException {

        if (packageID == 0 || packageID == null)
            return ResponseEntity.badRequest().build();

        PaqueryPackage paqueryPackage = paquerService.unassignPaquer(packageID);
        return ResponseEntity.ok(projectionFactory.createProjection(PackageProjection.class, paqueryPackage));
    }

    @SecuredApi
    @GetMapping("reasonsForVisit")
    public ResponseEntity reasons() {

        return ResponseEntity.ok(Response.create(packageStatusService.descripcionStatusForReasonVisit()));
    }
}
