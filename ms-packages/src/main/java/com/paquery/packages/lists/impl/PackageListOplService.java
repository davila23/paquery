package com.paquery.packages.lists.impl;

import com.paquery.commons.enums.OwnerType;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.packages.dao.PackageListDao;
import com.paquery.packages.dao.PaquerDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.lists.IPackageListService;
import com.paquery.security.UserRoleEnum;
import com.paquery.security.model.UserLogged;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PackageListOplService implements IPackageListService {

    @Autowired
    private PackageListDao packageListDao;

    @Autowired
    private PaquerDao paquerDao;

    private final static List<PackageStatus> statusInList = Arrays.asList(
            PackageStatus.AcceptedByPaquer,
            PackageStatus.InPowerOfThePaquer
    );

    private final static List<PackageStatus> statusInHistory = Arrays.asList(
            PackageStatus.Delivered,
            PackageStatus.Canceled
    );



    @Override
    public boolean applyRole(UserRoleEnum userRole) {
        return UserRoleEnum.ADMIN_OPL.equals(userRole) || UserRoleEnum.OPERATOR_OPL.equals(userRole);
    }

    @Override
    public Page<PaqueryPackage> list(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) {
        return getPackages(userLogged, search, status, statusInList, pageable);
    }

    @Override
    public Page<PaqueryPackage> history(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) {
        return getPackages(userLogged, search, status, statusInHistory, pageable);
    }

    private Page<PaqueryPackage> getPackages(UserLogged userLogged, String search, PackageStatus status, List<PackageStatus> defaultStatuses, Pageable pageable) {
        List<PackageStatus> statuses;

        if (status != null)
            statuses = Arrays.asList(status);
        else
            statuses = defaultStatuses;

        List<Long> paquerIds = paquerDao.getPaquerIdsByOwner(userLogged.getOwnerID(), OwnerType.LogisticOperator);
        return packageListDao.getPageTakedByPaquery(search, statuses, paquerIds, pageable);
    }
}
