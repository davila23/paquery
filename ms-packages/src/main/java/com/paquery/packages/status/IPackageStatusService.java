package com.paquery.packages.status;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.security.model.UserLogged;

import java.util.List;

public interface IPackageStatusService {

    List<PackageStatus> getAllowedStatus();

    PaqueryPackage changeStatus(PaqueryPackage paqueryPackage, PackageStatus newStatus) throws BusinessException;

    PaqueryPackage searchArrived(PaqueryPackage paqueryPackage, UserLogged userLogged) throws BusinessException;

    PackageType getPackageType();
}
