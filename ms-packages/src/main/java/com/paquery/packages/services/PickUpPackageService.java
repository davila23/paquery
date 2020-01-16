package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.ShippingAddressDto;
import com.paquery.commons.dto.ShippingScheduleDto;
import com.paquery.commons.enums.*;
import com.paquery.commons.exception.BusinessException;
import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.*;
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
import static org.springframework.util.Assert.isTrue;
import static org.springframework.util.Assert.notNull;

@Service
public class PickUpPackageService extends AbstractPackageService implements ICreatePackageService {

    private static Logger logger = LoggerFactory.getLogger(PickUpPackageService.class);

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

    @Autowired
    private PackageService packageService;

    @Override
    @Transactional
    public ResultCreatePackage createPackageMassive(PackageDto packageDto) {

        try {
            return ResultCreatePackage.ok(createPackage(packageDto).getId());
        } catch (Exception e) {
            logger.error("Error procesoando alta de package pickup con externalCode: " + packageDto.getExternalCode(), e);
            return ResultCreatePackage.withError(e.getMessage());
        }
    }


    public PaqueryPackage createPackage(PackageDto packageDto) throws BusinessException {

        PaqueryPackage pqPackage = createCommonPackage(packageDto);

        pqPackage.setPackageType(PackageType.PickUp);

        User user = userService.getOrCreateUser(packageDto.getUser());

        user = packageService.resolveOwnersUserByPackage(user, packageDto);

        pqPackage.setUser(user);

        // Si es con Stock se avisa marca como arribado a PaqueryPoint ya que el producto se tiene que encontrar
        // previamente en el deposito
        if (packageDto.getStockeable()) {
            pqPackage.setStatus(PackageStatus.ArrivedAtPaQueryPoint);
            // agrego por defecto 1 semana
            pqPackage.setDeliveryTerm(DeliveryTerm.OneWeek);
        }

        PaqueryPackage savePackage = packageDao.save(pqPackage);
        savePackage.setCode(generateCustomCode(savePackage.getId(), 8));
        packageDao.save(pqPackage);

        savePackage.setShippingScheduleOrigin(shippingScheduleService.createShippingSchedule(packageDto.getShippingScheduleOrigin(), packageDto, savePackage, ScheduleType.Origin));
        // mergeo el shipping origin en destino, con su address mergeado correspondiente
        ShippingAddressDto shippingAddressMergeDto = packageDto.getShippingScheduleDestination().getShippingAddress().merge(packageDto.getShippingScheduleOrigin().getShippingAddress());
        ShippingScheduleDto shippingScheduleMergeDto = packageDto.getShippingScheduleDestination().merge(packageDto.getShippingScheduleOrigin());
        shippingScheduleMergeDto.setShippingAddress(shippingAddressMergeDto);
        // y lo saovo
        savePackage.setShippingScheduleDestination(shippingScheduleService.createShippingSchedule(shippingScheduleMergeDto, packageDto, savePackage, ScheduleType.Destiny));
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
        if (packageDto.getStockeable() == null && packageDto.getOwnerType() == OwnerType.Marketplace)
            packageDto.setStockeable(marketplaceService.isStockeable(packageDto.getOwnerID()));
        if (packageDto.getStockeable()) {
            validatePackageForPickUpStockeable(packageDto);
        } else {
            validatePackageForPickUp(packageDto);
        }
    }

    private void validatePackageForPickUp(PackageDto packageDto) throws BusinessException {
        try {
            validatePackageDtoCommon(packageDto);
            notNull(packageDto.getDeliveryTerm(), format(messageFieldCommon, "Plazo"));
            //Uno de los dos tiene que venir para despues poder avisarle al usuario que puede retirar
            isTrue(
                    !(StringUtils.isEmpty(packageDto.getUser().getEmail())
                            && StringUtils.isEmpty(packageDto.getUser().getMobile()))
                    , format(messageFieldCommon, "Mail_Destinatario && Destino_Telefono"));
        } catch (IllegalArgumentException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    private void validatePackageForPickUpStockeable(PackageDto packageDto) throws BusinessException {
        try {
            validatePackageDtoCommon(packageDto);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(e.getMessage());
        }
    }

    public Page<PaqueryPackage> getPackagesFromPickup(String search, Integer status, Pageable pageable) {
        return packageDao.getOriginPackagesFromPickup(search, status, pageable);
    }

    public Page<PaqueryPackage> getOriginHistoryPackagesFromPickup(String search,
                                                                   Long marketplaceID,
                                                                   LocalDateTime sinceDate,
                                                                   LocalDateTime toDate,
                                                                   Pageable pageable) {
        return packageDao.getOriginPackagesHistoryFromPickup(search, marketplaceID, sinceDate, toDate, pageable);
    }

    public PaqueryPackage getOriginPackageFromPickupByID(Long id) {

        PaqueryPackage paqueryPackage = packageDao.getPackageFromPickupByID(id);
        if (paqueryPackage == null)
            throw new EntityNotFoundException("No existe Paquete con id: " + id);

        return paqueryPackage;
    }

    public void deliveredPendingSignature(PaqueryPackage paqueryPackage) throws BusinessException {

        if (paqueryPackage.getStatus().equals(PackageStatus.DeliveredPendingSignature)) return;

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();
        packageStatusService.changePackageStatus(paqueryPackage, PackageStatus.DeliveredPendingSignature, userLogged);

    }

    public List<PaqueryPackage> findByExternalCode(String externalCode) {
        return packageDao.findByExternalCodeList(externalCode, PackageType.PickUp);
    }

    public List<PaqueryPackage> findPendingSignatureByExternalCode(String externalCode) {
        return packageDao.findByExternalAndState(externalCode, PackageType.PickUp, PackageStatus.DeliveredPendingSignature);
    }

    public void updatePickupPackage(Long id, PackageDto packageDto) throws BusinessException {
        packageService.updatePackage(id, packageDto);
    }

}
