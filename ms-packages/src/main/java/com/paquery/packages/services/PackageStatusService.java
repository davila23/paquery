package com.paquery.packages.services;

import com.paquery.commons.enums.OwnerType;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.exception.BusinessException;
import com.paquery.commons.utils.DateUtils;
import com.paquery.packages.caronte.CaronteService;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.ShippingSchedule;
import com.paquery.packages.status.IPackageStatusService;
import com.paquery.packages.status.PackageStatusFactory;
import com.paquery.security.model.UserLogged;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.paquery.commons.enums.PackageStatus.ArrivedAtPaQueryPoint;

@Service
public class PackageStatusService {

    @Autowired
    private LogStatusPackageService logStatusPackageService;

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private ShippingScheduleService shippingScheduleService;

    @Autowired
    private CaronteService caronteService;

    @Autowired
    private PackageStatusFactory packageStatusFactory;

    private static final Logger logger = LoggerFactory.getLogger(PackageStatusService.class);

    public PaqueryPackage changePackageStatus(PaqueryPackage paqueryPackage, PackageStatus nextStatus, UserLogged user) throws BusinessException {

        //creo el log con los estados y luego le seteo el nuevo estado al paquete para salvarlo.
        logStatusPackageService.createLogStatusPackage(paqueryPackage, nextStatus, user);

        return changeStatus(paqueryPackage, nextStatus);
    }

    public PaqueryPackage searchArrived(PaqueryPackage paqueryPackage, UserLogged userLogged) throws BusinessException {
        IPackageStatusService statusService = packageStatusFactory.getStatusService(paqueryPackage.getPackageType());
        if (statusService != null)
            return statusService.searchArrived(paqueryPackage, userLogged);

        return changePackageStatus(paqueryPackage, resolveNextStatus(paqueryPackage.getStatus(), userLogged), userLogged);
    }


    private PaqueryPackage changeStatus(PaqueryPackage paqueryPackage, PackageStatus nextStatus) throws BusinessException {

        IPackageStatusService statusService = packageStatusFactory.getStatusService(paqueryPackage.getPackageType());

        if (statusService != null)
            return statusService.changeStatus(paqueryPackage, nextStatus);

        return defaultStatusChange(paqueryPackage, nextStatus);
    }

    private PaqueryPackage defaultStatusChange(PaqueryPackage paqueryPackage, PackageStatus nextStatus) {

        switch (nextStatus) {
            case Canceled:
                paqueryPackage.setCancelationDate(LocalDateTime.now());
                break;
            case Delivered:
                paqueryPackage.setDeliveryDate(LocalDateTime.now());
                break;
            case ArrivedAtPaQueryPoint:

                if (paqueryPackage.getArrivedAtPaqueryPointDate() == null) {

                    paqueryPackage.setArrivedAtPaqueryPointDate(DateUtils.nowLocalDateTime());
                }
                paqueryPackage = resolveRollPosition(paqueryPackage);

                if (paqueryPackage.getShippingScheduleDestination().getScheduledDate() == null
                        && paqueryPackage.getDeliveryTerm() != null) {

                    LocalDateTime scheduledDate = shippingScheduleService.resolveDeliveryDate(paqueryPackage.getDeliveryTerm());
                    paqueryPackage
                            .getShippingScheduleDestination()
                            .setScheduledDate(scheduledDate);

                    paqueryPackage
                            .getShippingScheduleDestination()
                            .setScheduledHour(String.valueOf(scheduledDate.getHour()));
                }
                break;
        }

        logger.info("Siguiente estado: {} / Anterior Estado: {}", nextStatus, paqueryPackage.getStatus());

        paqueryPackage.setStatus(nextStatus);

        // envio a integracion el cambio de estado.
        caronteService.updateStatus(paqueryPackage);

        return packageDao.updatePackage(paqueryPackage);
    }

    public PackageStatus resolveNextStatus(PackageStatus actualStatus, UserLogged userLogged) {
        if (actualStatus == PackageStatus.PendingEntryPaquery
                && userLogged.getOwnerType() != null
                && userLogged.getOwnerType() == OwnerType.PaqueryPoint.getValue()) {
            return ArrivedAtPaQueryPoint;
        }
        //BUSCO EL SIGUIENTE ESTADO EN ORDEN SINO DEVUELVO EL VALOR DEL MAPA DE PENDIENTE A PAQUERYPOINT(INGRESADO A PP)
        return (PackageStatus) mapOrderNextStatus().getOrDefault(actualStatus, ArrivedAtPaQueryPoint);
    }

    private static Map mapOrderNextStatus() {
        Map mapStatus = new HashMap<>();
        mapStatus.put(PackageStatus.PendingEntryPaquery, PackageStatus.LoggedInToPaQuery);
        mapStatus.put(PackageStatus.LoggedInToPaQuery, PackageStatus.pendingEntryPaQueryPoint);
        mapStatus.put(PackageStatus.pendingEntryPaQueryPoint, ArrivedAtPaQueryPoint);
        return mapStatus;
    }

    private PaqueryPackage resolveRollPosition(PaqueryPackage paqueryPackage) {

        ShippingSchedule shippingSchedule = shippingScheduleService.getShippingScheduleDestinyByPackageID(paqueryPackage.getId());

        if (!StringUtils.isEmpty(paqueryPackage.getExternalCode())
                && shippingSchedule != null
                && !StringUtils.isEmpty(shippingSchedule.getName())) {

            int i = paqueryPackage.getExternalCode().length() - 1;

            char firstChar = shippingSchedule.getName().charAt(0);

            char lastChar = paqueryPackage.getExternalCode().charAt(i);

            String numeric = "0123456789";
            while (i > 0 && numeric.indexOf(lastChar) == -1) {
                --i;
                lastChar = paqueryPackage.getExternalCode().charAt(i);
            }
            paqueryPackage.setRollContainerPosition(String.format("%s%s", firstChar, lastChar).toUpperCase());
            paqueryPackage.setRollContainerStatus(true);

        }
        return paqueryPackage;
    }

    public static List<String> descripcionStatusForReasonVisit() {
        List<String> resons = new ArrayList<>();
        resons.add(PackageStatus.valueOf(25).toString());
        resons.add(PackageStatus.valueOf(26).toString());
        resons.add(PackageStatus.valueOf(27).toString());
        return resons;
    }
}
