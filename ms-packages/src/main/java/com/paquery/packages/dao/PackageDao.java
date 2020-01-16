package com.paquery.packages.dao;

import com.paquery.packages.domain.Paquer;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.enums.OwnerType;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.packages.repositories.PackageRepository;
import com.paquery.commons.utils.DateUtils;
import com.paquery.security.model.UserLogged;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class PackageDao {

    @Autowired
    private PackageRepository packageRepository;

    public PaqueryPackage getPackageByID(long packageID) {
        return packageRepository.findById(packageID).get();
    }

    public PaqueryPackage getPackageByExternalCode(String externalCode) {
        return packageRepository.findByExternalCode(externalCode);
    }

    public void saveAll(List<PaqueryPackage> packages) {
        packageRepository.saveAll(packages);
    }

    public PaqueryPackage save(PaqueryPackage pack) {
        return packageRepository.save(pack);
    }

    public Page<PaqueryPackage> findByExternalCode(Pageable pageable, String externalCode) {
        return packageRepository.findByExternalCode(externalCode, pageable);
    }

    public List<PaqueryPackage> findByExternalCodeList(String externalCode, PackageType packageType) {
        return packageRepository.findByExternalCodeContainingIgnoreCaseAndPackageType(externalCode.toUpperCase(), packageType.getValue());
    }

    public List<PaqueryPackage> findByExternalAndState(String externalCode, PackageType packageType, PackageStatus packageStatus) {
        return packageRepository.findByExternalCodeContainingIgnoreCaseAndPackageTypeAndStatus(externalCode.toUpperCase(), packageType.getValue(), packageStatus.getValue());
    }

    public boolean existsByExternalCode(String externalCode) {
        return packageRepository.existsByExternalCode(externalCode);
    }

    public Page<PaqueryPackage> getOriginPackagesFromPickup(String search, Integer status, Pageable pageable) {
        return packageRepository.getPackagesFromPickup(
                search,
                null,
                null,
                status,
                null,
                null,
                pageable,
                PackageType.PickUp.getValue(),
                ScheduleType.Origin.getValue(),
                Arrays.asList(
                        PackageStatus.DeliveredPendingSignature.getValue(),
                        PackageStatus.PendingEntryPaquery.getValue(),
                        PackageStatus.LoggedInToPaQuery.getValue(),
                        PackageStatus.pendingEntryPaQueryPoint.getValue(),
                        PackageStatus.ArrivedAtPaQueryPoint.getValue()
                ));
    }

    public Page<PaqueryPackage> getOriginPackagesHistoryFromPickup(String search,
                                                                   Long ownerID,
                                                                   LocalDateTime sinceDate,
                                                                   LocalDateTime toDate,
                                                                   Pageable pageable) {
        return packageRepository.getPackagesFromPickup(
                search,
                ownerID,
                OwnerType.Marketplace.getValue(),
                null,
                sinceDate,
                toDate,
                pageable,
                PackageType.PickUp.getValue(),
                ScheduleType.Origin.getValue(),
                Arrays.asList(
                        PackageStatus.DeliveredPendingSignature.getValue(),
                        PackageStatus.Canceled.getValue(),
                        PackageStatus.Delivered.getValue(),
                        PackageStatus.Expired.getValue(),
                        PackageStatus.UnrecheableZone.getValue(),
                        PackageStatus.WrongAddress.getValue()
                ));
    }

    public PaqueryPackage getPackageByID(Long id) {
        return packageRepository.getPackageByIDAndType(id, null);
    }

    public PaqueryPackage getPackageFromPickupByID(Long id) {
        return packageRepository.getPackageByIDAndType(id, PackageType.PickUp.getValue());
    }


    public PaqueryPackage updatePackage(PaqueryPackage paqueryPackage) {
        // creo nueva fecha de modificacion
        paqueryPackage.setModificationDate(DateUtils.nowLocalDateTime());

        return packageRepository.save(paqueryPackage);
    }

    public PaqueryPackage getPackageAndShippingSchedulesByPackageID(Long packageID){
        return packageRepository.getPackageAndShippingSchedulesByPackageID(packageID);
    }

    /* Retiro en Tienda */

    public PaqueryPackage getOriginPackageFromStoreWithdrawalByID(Long id) {
        return packageRepository.getPackagePickupByID(id);
    }

    public Page<PaqueryPackage> getOriginPackagesFromStoreWithdrawal(String search, Integer status, Pageable pageable, UserLogged userLogged) {
        return packageRepository.getPackagesFromStoreWithdrawal(
                search,
                userLogged.getOwnerID(),
                null,
                status,
                null,
                null,
                pageable,
                PackageType.StoreWithdrawal.getValue(),
                ScheduleType.Origin.getValue(),
                Arrays.asList(
                        PackageStatus.DeliveredPendingSignature.getValue(),
                        PackageStatus.PendingEntryPaquery.getValue(),
                        PackageStatus.LoggedInToPaQuery.getValue(),
                        PackageStatus.pendingEntryPaQueryPoint.getValue(),
                        PackageStatus.ArrivedAtPaQueryPoint.getValue()
                ));
      }

    public Page<PaqueryPackage> getOriginPackagesHistoryFromStoreWithdrawal(String search,
                                                                            Long ownerID,
                                                                            LocalDateTime sinceDate,
                                                                            LocalDateTime toDate,
                                                                            Pageable pageable,
                                                                            UserLogged userLogged)
    {
        return packageRepository.getPackagesFromStoreWithdrawal(
                search,
                userLogged.getOwnerID(),
                userLogged.getOwnerType(),
                null,
                sinceDate,
                toDate,
                pageable,
                PackageType.StoreWithdrawal.getValue(),
                ScheduleType.Origin.getValue(),
                Arrays.asList(
                        PackageStatus.DeliveredPendingSignature.getValue(),
                        PackageStatus.Canceled.getValue(),
                        PackageStatus.Delivered.getValue(),
                        PackageStatus.Expired.getValue(),
                        PackageStatus.UnrecheableZone.getValue(),
                        PackageStatus.WrongAddress.getValue()
                ));

    }

    public Page<PaqueryPackage> packagesHistoryByPaquerID(Pageable pageable,
                                                          Long driverID,
                                                          LocalDateTime sinceDate,
                                                          LocalDateTime toDate) {

        return packageRepository.packagesHistoryByPaquerID(driverID,
                pageable,
                sinceDate,
                toDate,
                ScheduleType.Destiny.getValue(),
                Arrays.asList(PackageStatus.Delivered.getValue(),
                        PackageStatus.Canceled.getValue())
        );
    }

    public PaqueryPackage findByShippingScheduleID(Long shippingScheduleID) {
        return packageRepository.findByShippingScheduleID(shippingScheduleID);
    }

    public List getRawPackageInfoReadyToExpire() {
        return packageRepository.getResultPackageForExpiration();
    }
}
