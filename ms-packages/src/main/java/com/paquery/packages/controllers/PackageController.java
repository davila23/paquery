package com.paquery.packages.controllers;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.Response;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.StatusResult;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.projections.PackageProjection;
import com.paquery.packages.excel.ColTypeUploadMassivePackageEnum;
import com.paquery.packages.excel.UploadMassivePackageDto;
import com.paquery.packages.excel.UploadMassivePackageRowWritter;
import com.paquery.packages.excel.UploadMassiveRowMapper;
import com.paquery.packages.model.ResultCreatePackage;
import com.paquery.packages.services.ExcelService;
import com.paquery.packages.services.PackageCreatorService;
import com.paquery.packages.services.PackageService;
import com.paquery.packages.services.UploadMassivePackageService;
import com.paquery.security.SecuredApi;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.util.Pair;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/packages")
public class PackageController {

    private static Logger logger = LoggerFactory.getLogger(PackageController.class);

    @Autowired
    private PackageService packageService;

    @Autowired
    private UploadMassivePackageService uploadMassivePackageService;

    @Autowired
    private PackageCreatorService packageCreatorService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private ProjectionFactory projectionFactory;

    @Autowired
    private UserSecurityService userSecurityService;

    @SecuredApi
    @GetMapping
    public ResponseEntity getPackages(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) PackageStatus status,
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "creationDate", direction = Sort.Direction.DESC),
            })
                    Pageable pageable
    ) throws BusinessException {
        logger.info("GET /packages?search={}&pageable={}", search, pageable);
        UserLogged userLogged = userSecurityService.obtainUserLogged();
        Page<PaqueryPackage> page = packageService.listPackages(userLogged, search, status, pageable);
        return ResponseEntity.ok(
                Response.create(page.map(
                        p -> projectionFactory.createProjection(PackageProjection.class, p))
                ));
    }

    @SecuredApi
    @GetMapping("/history")
    public ResponseEntity getHistoryPackages(
            @RequestParam(value = "search", required = false, defaultValue = "") String search,
            @RequestParam(value = "status", required = false) PackageStatus status,
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "deliveryDate", direction = Sort.Direction.DESC),
            })
                    Pageable pageable
    ) throws BusinessException {
        logger.info("GET /packages/history?search={}&pageable={}", search, pageable);
        UserLogged userLogged = userSecurityService.obtainUserLogged();
        Page<PaqueryPackage> page = packageService.listHistoryPackages(userLogged, search, status, pageable);
        return ResponseEntity.ok(
                Response.create(page.map(
                        p -> projectionFactory.createProjection(PackageProjection.class, p))
                ));
    }

    @SecuredApi
    @GetMapping("/findByExternalCode/{externalCode}")
    public ResponseEntity findByExternalCode(Pageable pageable, @PathVariable("externalCode") String externalCode) {
        Page<PaqueryPackage> page = packageService.findByExternalCode(pageable, externalCode);
        return ResponseEntity.ok(
                page.map(paqueryPackage -> projectionFactory.createProjection(PackageProjection.class, paqueryPackage))
        );
    }


    @PostMapping
    @SecuredApi
    public ResponseEntity createPackage(@RequestBody PackageDto packageDto) {
        logger.info("POST /packages/  con externalCode: {}", packageDto.getExternalCode());
        ResultCreatePackage result = packageCreatorService.createPackage(packageDto);

        if (!result.getStatusResult().equals(StatusResult.OK)) {
            logger.error("{}", result.getMessage());
            return ResponseEntity.unprocessableEntity().body(Response.error(result.getMessage(), 1));
        }

        return ResponseEntity.ok(Response.create(null));
    }


    @SecuredApi
    @PostMapping(value = "/massive")
    public ResponseEntity massivePackageCreation(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, BusinessException {


        logger.info("inicio de alta masiva");
        Optional<Part> partFile = request.getParts().stream().findFirst();

        if (!partFile.isPresent())
            return ResponseEntity.badRequest().build();

        List<UploadMassivePackageDto> packageDtoList = new ArrayList<>();
        excelService.readExcel(partFile.get().getInputStream(), new UploadMassiveRowMapper(), packageDtoList);


        List<Pair<UploadMassivePackageDto, ResultCreatePackage>> resultErros = new ArrayList<>();
        int procesados = 0;

        for (UploadMassivePackageDto dto : packageDtoList) {
            ResultCreatePackage resultCreate = uploadMassivePackageService.createUploadMassivePackage(dto);
            if (StatusResult.ERROR.equals(resultCreate.getStatusResult()))
                resultErros.add(Pair.of(dto, resultCreate));
            else
                procesados++;
        }

        logger.info("paquetes procesados exitosos: " + procesados);

        if (!resultErros.isEmpty()) {
            logger.info(" *** paquetes con ERROR: " + resultErros.size());
            logger.info(" *** creando excel con errores");

            Map excelInfo = new LinkedHashMap();

            byte[] out = excelService.createExcel(
                    resultErros,
                    new UploadMassivePackageRowWritter(),
                    ColTypeUploadMassivePackageEnum.getColumnNames(),
                    excelInfo
            );

            response.setContentLength(out.length);
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.addHeader("Content-Disposition", "attachment;filename=pq_import_result.xlsx");
            response.getOutputStream().write(out);
            response.flushBuffer();

        }


        return ResponseEntity.noContent().build();
    }

    @PutMapping("/searchArrived")
    public ResponseEntity actionBySearchArrived(@RequestParam(name = "searchArrived") String searchArrived) throws BusinessException {

        logger.info("GET /packages/searchArrived?searchArrived= {}", searchArrived);

        if (StringUtils.isEmpty(searchArrived))
            return ResponseEntity.noContent().build();

        PaqueryPackage paqueryPackage = packageService.searchArrived(searchArrived);

        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackageProjection.class, paqueryPackage)));
    }

    @GetMapping("/package/{id}")
    public ResponseEntity findPackageByID(@PathVariable("id") Long id) {
        logger.info("GET /packages/package/{}", id);
        PaqueryPackage paqueryPackage = packageService.gePackageByID(id);
        return ResponseEntity.ok(Response.create(projectionFactory.createProjection(PackageProjection.class, paqueryPackage)));
    }

    @PutMapping(value = "/package/{id}")
    public ResponseEntity UpdatePackage(@PathVariable("id") Long id, @RequestBody PackageDto packageVisitDto) throws
            BusinessException {
        logger.info("PUT /packages/package/{}", id);
        if (id == null || id == 0)
            throw new BusinessException("El ID no puede ser null o = 0");
        packageService.updatePackage(id, packageVisitDto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/allowedStatus")
    @SecuredApi
    public ResponseEntity allowedStatusByPackageType(@RequestParam(name = "packageType") PackageType packageType) throws BusinessException {

        logger.info("GET /packages/allowedStatus?packageType= {}", packageType);

        if (StringUtils.isEmpty(packageType))
            return ResponseEntity.noContent().build();

        List<PackageStatus> result = packageService.allowedStatusByPackageType(packageType);

        return ResponseEntity.ok(Response.create(result.stream().map(PackageStatus::toMap).collect(Collectors.toList())));
    }
}
