package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.VisitDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import com.paquery.packages.status.IPackageStatusService;
import com.paquery.packages.status.PackageStatusFactory;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.Paquer;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.lists.IPackageListService;
import com.paquery.packages.lists.PackageListFactory;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class PackageService {

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private PackageStatusService packageStatusService;

    @Autowired
    private SignatureService signatureService;

    @Autowired
    private UserSecurityService userSecurityService;

    @Autowired
    private AvatarService avatarService;

    @Autowired
    private VisitService visitService;

    @Autowired
    private PaquerService paquerService;

    @Autowired
    private ShippingScheduleService shippingScheduleService;

    @Autowired
    private PackageStatusFactory packageStatusFactory;

    @Autowired
    private PackageListFactory packageListFactory;

    public Page<PaqueryPackage> findByExternalCode(Pageable pageable, String externalCode) {
        return packageDao.findByExternalCode(pageable, externalCode);
    }

    public PaqueryPackage getPackageByExternalCode(String externalCode) {
        return packageDao.getPackageByExternalCode(externalCode);
    }

    public void calcelPackageByID(Long id) throws BusinessException {

        PaqueryPackage paqueryPackage = packageDao.getPackageByID(id);

        if (paqueryPackage != null) {
            UserLogged userLogged = this.userSecurityService.obtainUserLogged();
            packageStatusService.changePackageStatus(paqueryPackage, PackageStatus.Canceled, userLogged);
        }
    }

    @Transactional
    public void updatePackage(Long id, PackageDto packageDto) throws BusinessException {
        PaqueryPackage paqueryPackage = packageDao.getPackageByID(id);

        if (paqueryPackage == null)
            throw new EntityNotFoundException("No existe Paquete con id: " + id);

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        packageDto.setSignatureImage(signatureService.addSignatureToPackage(packageDto.getId(), packageDto.getSignatureImage()));

        packageDto.setAvatar(avatarService.addAvatarToPackage(packageDto.getId(), packageDto.getAvatar()));

        paqueryPackage.updatePackageCommon(packageDto);

        updatePaquerFromDto(paqueryPackage, packageDto);

        for (VisitDto visit : packageDto.getShippingScheduleDestination().getVisits()) {
            visit.setPhotoName(visitService.addVisitImageToShipping(id, visit));
        }

        PaqueryPackage newPackage = shippingScheduleService.updateShippingsByPackageDto(paqueryPackage, packageDto);
        newPackage.setId(id);

        if (paqueryPackage.getStatus().getValue() != packageDto.getStatus().getValue())
            // verifico si el paquete de la DB, tiene distinto estado con el  packageDto
            packageStatusService.changePackageStatus(newPackage, packageDto.getStatus(), userLogged);
        else// sino lo guardo con el mismo status
            packageDao.updatePackage(newPackage);
    }

    private void updatePaquerFromDto(PaqueryPackage paqueryPackage, PackageDto packageDto) throws BusinessException {
        if (packageDto.getShippingScheduleDestination().getDriverID() == null)
            return;

        Paquer paquer = paquerService.getPaquerByID(packageDto.getShippingScheduleDestination().getDriverID());

        paqueryPackage.updatePaquerAssign(paquer);
    }

    public PaqueryPackage searchArrived(String searchArrived) throws BusinessException {

        PaqueryPackage paqueryPackage = getPackageByExternalCode(searchArrived);
        if (paqueryPackage == null) {
            throw new BusinessException("No existe paquete con codigo externo: " + searchArrived);
        }

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        return packageStatusService.searchArrived(paqueryPackage, userLogged);
    }

    public User resolveOwnersUserByPackage(User user, PackageDto packageDto) {
        if ((user.getOwnerID() == null || user.getOwnerType() == 0)
                && (user.getOwnerID() == null || user.getOwnerID() == 0)) {
            user.setOwnerType(packageDto.getOwnerType().getValue());
            user.setOwnerID(packageDto.getOwnerID());
        }
        return user;
    }

    @Transactional(readOnly = true)
    public List<PackageStatus> allowedStatusByPackageType(PackageType packageType) throws BusinessException {
        IPackageStatusService service = packageStatusFactory.getStatusService(packageType);
        if (service != null)
            return service.getAllowedStatus();

        return Arrays.asList(PackageStatus.values());
    }

    public PaqueryPackage gePackageByID(Long id) {

        PaqueryPackage paqueryPackage = packageDao.getPackageByID(id);
        if (paqueryPackage == null)
            throw new EntityNotFoundException("No existe Paquete con id: " + id);

        return paqueryPackage;
    }

    public Page<PaqueryPackage> listPackages(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) throws BusinessException {
        IPackageListService packageListService = packageListFactory.getListService(userLogged.getRole());

        if (packageListService == null)
            throw new BusinessException("No hay servicio de listado de packages para role: %s", userLogged.getRole());

        return packageListService.list(userLogged, search, status, pageable);
    }

    @Transactional(readOnly = true)
    public Page<PaqueryPackage> listHistoryPackages(UserLogged userLogged, String search, PackageStatus status, Pageable pageable) throws BusinessException {
        IPackageListService packageListService = packageListFactory.getListService(userLogged.getRole());

        if (packageListService == null)
            throw new BusinessException("No hay servicio de listado historico de packages para role: %s", userLogged.getRole());

        return packageListService.history(userLogged, search, status, pageable);
    }
}
