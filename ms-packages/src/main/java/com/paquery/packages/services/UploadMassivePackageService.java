package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.packages.dto.builder.PackageDtoBuilder;
import com.paquery.commons.enums.PackageType;
import com.paquery.packages.excel.UploadMassivePackageDto;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.model.ResultCreatePackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadMassivePackageService {

    @Autowired
    private PackageCreatorService packageCreatorService;

    @Autowired
    private PackageDtoBuilder dtoBuilder;

    public ResultCreatePackage createUploadMassivePackage(UploadMassivePackageDto uploadPackageDto) throws BusinessException {

        PackageDto pkgDto = dtoBuilder.build(uploadPackageDto);

        return packageCreatorService.createPackage(pkgDto);
    }
}
