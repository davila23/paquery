package com.paquery.packages.services;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.commons.dto.VisitDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.dao.PaquerDao;
import com.paquery.packages.dao.ShippingScheduleDao;
import com.paquery.packages.domain.Paquer;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.ShippingSchedule;
import com.paquery.packages.domain.User;
import com.paquery.packages.domain.Visit;
import com.paquery.packages.enums.FilterHistoryEnum;
import com.paquery.packages.model.AcceptPackagesByPaquerRequest;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import com.paquery.packages.utils.DateUtils;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaquerService {

    @Autowired
    private UserSecurityService userSecurityService;

    @Autowired
    private PaquerDao paquerDao;

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private ShippingScheduleDao shippingScheduleDao;

    @Autowired
    private PackageStatusService packageStatusService;

    @Autowired
    private VisitService visitService;

    public static final String SINCE_DATE = "sinceDate";

    public static final String TO_DATE = "toDate";


    @Transactional
    public void acceptPackagesByPaquer(AcceptPackagesByPaquerRequest paquerRequest) throws BusinessException {

        List<ShippingSchedule> shippingsSchedulesByPackage;

        ShippingSchedule shippingDestiny;
        Paquer paquer = paquerDao.getPaquerByID(paquerRequest.getPaquerID());
        if (paquer == null)
            throw new EntityNotFoundException("No existe Paquer con id: " + paquerRequest.getPaquerID());

        Set<ShippingSchedule> shippingSchedules = new HashSet<>();
        UserLogged userLogged = userSecurityService.obtainUserLogged();
        for (Long packageID : paquerRequest.getPackagesID()) {
            //traigo los shippings de cada paquete
            shippingsSchedulesByPackage = shippingScheduleDao.getShippingScheduleByPackageID(packageID);
            // filtro el destiny
            shippingDestiny = shippingsSchedulesByPackage
                    .stream()
                    .filter(shi -> shi.getScheduleType() == ScheduleType.Destiny)
                    .findFirst()
                    .get();
            //valido su estado
            if (validateAvailabilityForPaquerFromPackage(shippingDestiny)) {
                // les seteo a los 2 el status y el driverID
                shippingsSchedulesByPackage.
                        forEach(
                                shippingSchedule -> {
                                    shippingSchedule.setPaquer(paquer);
                                });
                PaqueryPackage pachagePaquery = packageDao.getPackageByID(packageID);
                // agrego el metodo en comun para cambiar de estados.
                packageStatusService.changePackageStatus(pachagePaquery, PackageStatus.AcceptedByPaquer, userLogged);

                shippingSchedules.addAll(shippingsSchedulesByPackage);
            }
        }
        shippingScheduleDao.saveAll(shippingSchedules);
    }

    private boolean validateAvailabilityForPaquerFromPackage(ShippingSchedule shipping) throws BusinessException {
        if (!shipping.getPaqueryPackage().getStatus().equals(PackageStatus.ArrivedAtPaQueryPoint)
                || shipping.getPaquer() != null)
            throw new BusinessException("El paquete no se encuentra en el stado Arribado a Paquery Point o tiene asignado un Paquer");
        return true;
    }

    public PaqueryPackage unassignPaquer(Long packageID) throws BusinessException {

        PaqueryPackage paqueryPackage = packageDao.
                getPackageAndShippingSchedulesByPackageID(packageID);


        if (paqueryPackage == null
                || paqueryPackage.getShippingSchedules().isEmpty()
                || paqueryPackage.getShippingSchedules()
                .stream()
                .filter(shi -> shi.getPaquer().getId() != null)
                .collect(Collectors.toList()).isEmpty())
            throw new BusinessException("No existe informacion para el Paquete {}", packageID);

        paqueryPackage.getShippingSchedules().stream().forEach(shippingSchedule -> {
            shippingSchedule.setPaquer(null);
        });

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        return packageStatusService.changePackageStatus(paqueryPackage, PackageStatus.ArrivedAtPaQueryPoint, userLogged);
    }

    public Page<PaqueryPackage> packagesHistoryByPaquerID(Pageable pageable,
                                                          FilterHistoryEnum filterHistory,
                                                          LocalDateTime sinceDate,
                                                          LocalDateTime toDate) {

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        if (filterHistory != null) {
            Map<String, LocalDateTime> date = resolveFilterMonthDates(filterHistory);
            sinceDate = date.get(SINCE_DATE);
            toDate = date.get(TO_DATE);
        }

        return packageDao.packagesHistoryByPaquerID(pageable, userLogged.getId(), sinceDate, toDate);
    }

    public Map<String, LocalDateTime> resolveFilterMonthDates(FilterHistoryEnum filterHistoryEnum) {

        Map<String, LocalDateTime> date = new HashMap<>();
        LocalDateTime now = DateUtils.nowLocalDateTime();

        int yearCurrent = now.getYear();
        int monthCurrent = now.getMonthValue();

        if (filterHistoryEnum == FilterHistoryEnum.LastMonth) {
            LocalDateTime newDateLastMonth = now.minusMonths(1);
            int limitDay = DateUtils.limitDayForMonth(newDateLastMonth);

            date.put(SINCE_DATE, LocalDateTime.of(yearCurrent, newDateLastMonth.getMonthValue(), 1, 00, 00, 00));
            date.put(TO_DATE, LocalDateTime.of(yearCurrent, newDateLastMonth.getMonthValue(), limitDay, 23, 59, 59));

        } else {

            date.put(SINCE_DATE, LocalDateTime.of(yearCurrent, monthCurrent, 1, 00, 00, 00));
            date.put(TO_DATE, now);

        }

        return date;
    }

    public void setVisit(VisitDto visitDto) throws BusinessException {

        UserLogged userLogged = userSecurityService.obtainUserLogged();

        ShippingSchedule shippingSchedule = shippingScheduleDao.getShippingScheduleVisistsByID(visitDto.getShippingScheduleID());
        if (shippingSchedule == null
                || shippingSchedule.getScheduleType() != ScheduleType.Destiny
                || shippingSchedule.getPaquer().getId() != userLogged.getId())
            throw new BusinessException("No existe el ShippingScheduleID, o no pertenece al Paquer");

        Integer visits = shippingSchedule.getVisits().size();
        PaqueryPackage paqueryPackage = shippingSchedule.getPaqueryPackage();

        PackageStatus status;

        if (visits == 0) {

            status = PackageStatus.DeliveryAttempt1;

        } else if (visits == 1) {

            status = PackageStatus.DeliveryAttempt2;

        } else {
            throw new BusinessException("Ya se realizaron 2 visitas");
        }
        //TODO CREAR UNA NOTIFICACION PARA EL INTENTO DE ENTREGA EN EL FUTURO SERVICIO DE NOTIFICACIONES
        packageStatusService.changePackageStatus(paqueryPackage, status, userLogged);

        String photoName = visitService.savePhotoVisit(visitDto, paqueryPackage.getId());

        Visit visit = visitService.createVisitByDto(visitDto, status);
        visit.setPhoto(photoName);
        visit.setShippingSchedule(shippingSchedule);
        visitService.saveVisit(visit);
    }

    public Paquer getPaquerByID(Long paquerID) throws BusinessException {

        Paquer paquer = paquerDao.getPaquerByID(paquerID);
        if (paquer == null)
            throw new BusinessException("no existe el paquer");

        return paquer;
    }
}
