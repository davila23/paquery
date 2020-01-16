package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.model.ResultCreatePackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PackageCreatorService {

    @Autowired
    private SendPackageService sendPackageService;

    @Autowired
    private PickUpPackageService pickUpPackageService;

    @Autowired
    private StoreWithdrawalPackageService storeWithdrawalPackageService;

    public ResultCreatePackage createPackage(PackageDto packageDto) {
        if (PackageType.PickUp.equals(packageDto.getPackageType()))
            return processCreatePackage(pickUpPackageService, packageDto);

        if (PackageType.Send.equals(packageDto.getPackageType()))
            return processCreatePackage(sendPackageService, packageDto);

        if (PackageType.StoreWithdrawal.equals(packageDto.getPackageType()))
            return processCreatePackage(storeWithdrawalPackageService, packageDto);
        // por default
        return processCreatePackage(sendPackageService, packageDto);
    }

    private ResultCreatePackage processCreatePackage(ICreatePackageService service, PackageDto pkgDto) {
        try {
            service.validate(pkgDto);
            return service.createPackageMassive(pkgDto);
        } catch (BusinessException be) {
            return ResultCreatePackage.withError(be.getMessage());
        }
    }
}
