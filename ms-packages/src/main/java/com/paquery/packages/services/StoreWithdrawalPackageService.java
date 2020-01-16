package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import com.paquery.packages.model.ResultCreatePackage;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

import static com.paquery.commons.utils.CodeUtils.generateCustomCode;
import static java.lang.String.format;
import static org.springframework.util.Assert.*;
import static org.springframework.util.Assert.hasText;

@Service
public class StoreWithdrawalPackageService extends AbstractPackageService implements ICreatePackageService {

    private static Logger logger = LoggerFactory.getLogger(StoreWithdrawalPackageService.class);

    @Autowired
    private IUserService userService;

    @Autowired
    private ShippingScheduleService shippingScheduleService;

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private MarketplaceService marketplaceService;

    @Autowired
    private PackageStatusService packageStatusService;

    @Autowired
    private UserSecurityService userSecurityService;

    @Override
    @Transactional
    public ResultCreatePackage createPackageMassive(PackageDto packageDto) {

        try {
            createPackage(packageDto);
            return ResultCreatePackage.ok();
        } catch (Exception e) {
            logger.error("Error procesoando alta de package Store Withdrawal con externalCode: " + packageDto.getExternalCode(), e);
            return ResultCreatePackage.withError(e.getMessage());
        }
    }


    public PaqueryPackage createPackage(PackageDto packageDto) throws BusinessException {

        PaqueryPackage pqPackage = createCommonPackage(packageDto);

        pqPackage.setPackageType(PackageType.StoreWithdrawal);

        User user = userService.getOrCreateUser(packageDto.getUser());

        pqPackage.setUser(user);


        PaqueryPackage savePackage = packageDao.save(pqPackage);
        savePackage.setCode(generateCustomCode(savePackage.getId(), 8));
        packageDao.save(pqPackage);

        savePackage.setShippingScheduleOrigin(shippingScheduleService.createShippingSchedule(packageDto.getShippingScheduleOrigin(), packageDto, savePackage, ScheduleType.Origin));
        savePackage.setShippingScheduleDestination(shippingScheduleService.createShippingSchedule(packageDto.getShippingScheduleDestination(), packageDto, savePackage, ScheduleType.Destiny));

        return savePackage;
    }

    @Transactional
    public PaqueryPackage createPackageWithIntegration(PackageDto packageDto) throws BusinessException {

        validate(packageDto);

        PaqueryPackage paqueryPackage = createPackage(packageDto);

        return paqueryPackage;
    }

    @Override
    public void validate(PackageDto packageDto) throws BusinessException {
        validatePackageForStoreWithdrawal(packageDto);
    }

    private void validatePackageForStoreWithdrawal(PackageDto packageDto) throws BusinessException {
        try {
            validateFromOriginAndDestinyPackages(packageDto);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    public Page<PaqueryPackage> getOriginPackagesFromStoreWithdrawal(String search, Integer status, Pageable pageable) {

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        return packageDao.getOriginPackagesFromStoreWithdrawal(search, status, pageable, userLogged);
    }

    public Page<PaqueryPackage> getOriginHistoryPackagesFromStoreWithdrawal(String search,
                                                                            Long marketplaceID,
                                                                            LocalDateTime sinceDate,
                                                                            LocalDateTime toDate,
                                                                            Pageable pageable) {
        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        return packageDao.getOriginPackagesHistoryFromStoreWithdrawal(search, marketplaceID, sinceDate, toDate, pageable, userLogged);
    }

    public PaqueryPackage getPackageFromStoreWithdrawalByID(Long id) {

        PaqueryPackage paqueryPackage = packageDao.getOriginPackageFromStoreWithdrawalByID(id);

        if (paqueryPackage == null) throw new EntityNotFoundException("No existe Paquete con id: " + id);

        paqueryPackage.setSignatureImage(paqueryPackage.getSignatureImage());

        paqueryPackage.setAvatar(paqueryPackage.getAvatar());

        return paqueryPackage;
    }

    public void deliveredPendingSignature(PaqueryPackage paqueryPackage) throws BusinessException {

        if (paqueryPackage.getStatus().equals(PackageStatus.DeliveredPendingSignature)) return;

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        packageStatusService.changePackageStatus(paqueryPackage, PackageStatus.DeliveredPendingSignature, userLogged);

    }

    public List<PaqueryPackage> findByExternalCode(String externalCode) {
        return packageDao.findByExternalCodeList(externalCode, PackageType.StoreWithdrawal);
    }

    public List<PaqueryPackage> findPendingSignatureByExternalCode(String externalCode) {
        return packageDao.findByExternalAndState(externalCode, PackageType.StoreWithdrawal, PackageStatus.DeliveredPendingSignature);
    }
}
