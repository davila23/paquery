package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.model.ResultCreatePackage;

public interface ICreatePackageService {

    ResultCreatePackage createPackageMassive(PackageDto packageDto)  throws BusinessException;

    void validate(PackageDto packageDto) throws BusinessException;

}
