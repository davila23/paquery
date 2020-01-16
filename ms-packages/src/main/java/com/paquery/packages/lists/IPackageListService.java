package com.paquery.packages.lists;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.security.UserRoleEnum;
import com.paquery.security.model.UserLogged;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPackageListService {

    boolean applyRole(UserRoleEnum userRole);

    Page<PaqueryPackage> list(UserLogged userLogged, String search, PackageStatus status, Pageable pageable);

    Page<PaqueryPackage> history(UserLogged userLogged, String search, PackageStatus status, Pageable pageable);

}
