package com.paquery.packages.status.impl;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.repositories.PackageRepository;
import com.paquery.packages.services.LogStatusPackageService;
import com.paquery.packages.status.IPackageStatusService;
import com.paquery.security.model.UserLogged;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Arrays;
import java.util.List;

@Service
public class PackageStatusStoreWithdrawalService implements IPackageStatusService {


    @Autowired
    private PackageDao packageDao;

    @Autowired
    private LogStatusPackageService logStatusPackageService;

    private final static List<PackageStatus> allowedStatus = Arrays.asList(

            PackageStatus.PendingEntryPaquery,
            PackageStatus.AvailableInStore,
            PackageStatus.AcceptedByPaquer,
            PackageStatus.InPowerOfThePaquer,

            PackageStatus.DeliveryAttempt1,
            PackageStatus.DeliveryAttempt2,

            PackageStatus.Delivered,
            PackageStatus.PendingSchedule,
            PackageStatus.DeliveredPendingSignature,
            PackageStatus.Canceled
    );


    @Override
    public List<PackageStatus> getAllowedStatus() {
        return allowedStatus;
    }

    @Override
    public PaqueryPackage changeStatus(PaqueryPackage paqueryPackage, PackageStatus newStatus) throws BusinessException {

        Assert.notNull(paqueryPackage, "Package no puede ser nulo");
        Assert.notNull(newStatus, "PackageStatus no puede ser nulo");

        if (!allowedStatus.contains(newStatus))
            throw new BusinessException("No es posible cambiar de estado a %s de tipo %s al estado %s",paqueryPackage.getExternalCode(), getPackageType(), newStatus);

        paqueryPackage.setStatus(newStatus);

        return packageDao.save(paqueryPackage);
    }

    @Override
    public PaqueryPackage searchArrived(PaqueryPackage paqueryPackage, UserLogged userLogged) throws BusinessException {

        // Si esta en poder del paquer le doy salida
        if (PackageStatus.AcceptedByPaquer.equals(paqueryPackage.getStatus())) {
            logStatusPackageService.createLogStatusPackage(paqueryPackage, PackageStatus.InPowerOfThePaquer, userLogged);
            changeStatus(paqueryPackage, PackageStatus.InPowerOfThePaquer);
        }

        return paqueryPackage;
    }

    @Override
    public PackageType getPackageType() {
        return PackageType.StoreWithdrawal;
    }

}
