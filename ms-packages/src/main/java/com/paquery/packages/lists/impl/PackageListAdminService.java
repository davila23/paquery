package com.paquery.packages.lists.impl;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.dao.PackageListDao;
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
public class PackageListAdminService implements IPackageListService {

    @Autowired
    private PackageListDao packageListDao;


    private final static List<PackageStatus> statusInList = Arrays.asList(
            PackageStatus.PendingEntryPaquery,
            PackageStatus.LoggedInToPaQuery,
            PackageStatus.pendingEntryPaQueryPoint,
            PackageStatus.ArrivedAtPaQueryPoint,
            PackageStatus.AcceptedByPaquer,
            PackageStatus.InPowerOfThePaquer,
            PackageStatus.DeliveryAttempt1,
            PackageStatus.DeliveryAttempt2,
            PackageStatus.DeliveredPendingSignature
    );

    private final static List<PackageStatus> statusInHistory = Arrays.asList(
            PackageStatus.Delivered,
            PackageStatus.Canceled,
            PackageStatus.Returned,
            PackageStatus.Expired,
            PackageStatus.UnrecheableZone,
            PackageStatus.WrongAddress
    );

    @Override
    public boolean applyRole(UserRoleEnum userRole) {
        return UserRoleEnum.ADMIN.equals(userRole);
    }

    @Override
    public Page<PaqueryPackage> list(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) {
        return packageListDao.getPage(
                search,
                status != null ? Arrays.asList(status) : statusInList,
                pageable
        );
    }

    @Override
    public Page<PaqueryPackage> history(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) {
        return packageListDao.getPage(
                search,
                status != null ? Arrays.asList(status) : statusInHistory,
                pageable
        );
    }
}
