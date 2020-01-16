package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.ShippingScheduleDto;
import com.paquery.commons.dto.VisitDto;
import com.paquery.commons.enums.DeliveryTerm;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.commons.utils.DateUtils;
import com.paquery.packages.dao.ShippingScheduleDao;
import com.paquery.packages.domain.*;
import com.paquery.packages.maps.service.MapsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Random;

import static com.paquery.commons.utils.DateUtils.*;

@Service
public class ShippingScheduleService {

    @Autowired
    private ShippingAddressService shippingAddressService;

    @Autowired
    private ShippingScheduleDao shippingScheduleDao;

    @Autowired
    private MapsService mapsService;

    @Autowired
    private DistributionZoneService distributionZoneService;

    @Autowired
    private PaquerService paquerService;

    public ShippingSchedule createShippingScheduleByDto(ShippingScheduleDto shippingScheduleDto) {
        return new ShippingSchedule(shippingScheduleDto);
    }

    private final static int MIN = 111111;
    private final static int MAX = 999999;
    private final static int DAYS_EXPIRATION_DATE = 10;
    private final static int HOURS_SCHEDULED_DATE_ORIGIN = 12;
    private final static int HOURS_SCHEDULED_DATE_DESTINY = 24;

    public ShippingSchedule createShippingSchedule(ShippingScheduleDto shippingScheduleDto, PackageDto packageDto, PaqueryPackage pkg, ScheduleType scheduleType) throws BusinessException {

        ShippingSchedule shippingSchedule = createShippingScheduleByDto(shippingScheduleDto);

        shippingSchedule.setScheduleType(scheduleType);
        ShippingAddress shippingAddress;

        if (shippingSchedule.getImmediateDelivery()) {
            if (scheduleType == ScheduleType.Origin) {

                shippingSchedule.setScheduledDate(nowAddHours(DateUtils.nowLocalDateTime(), HOURS_SCHEDULED_DATE_ORIGIN));

            } else if (scheduleType == ScheduleType.Destiny) {
                if (pkg.getDeliveryTerm() == null) {
                    shippingSchedule.setScheduledDate(nowAddHours(DateUtils.nowLocalDateTime(), HOURS_SCHEDULED_DATE_DESTINY));
                } else if (pkg.getStatus() == PackageStatus.ArrivedAtPaQueryPoint) {
                    shippingSchedule.setScheduledDate(resolveDeliveryDate(pkg.getDeliveryTerm()));
                }
            }
        }

        shippingAddress = shippingAddressService.createShippingAddres(shippingScheduleDto.getShippingAddress(), pkg);

        if (packageDto.getPackageType() != PackageType.PickUp && shippingScheduleDto.getDriverID() != null) {
            //TODO REVISAR SI SE VALIDA EL PAQUER ACA O ANTES.
            Paquer paquer = paquerService.getPaquerByID(shippingScheduleDto.getDriverID());
            shippingSchedule.setPaquer(paquer);
        }

        shippingSchedule.setDistributionZone(mapsService.resolveDistributionZoneByAddress(shippingAddress.getAddressDetail()));

        shippingSchedule.setShippingAddress(shippingAddress);
        shippingSchedule.setPaqueryPackage(pkg);
        shippingSchedule.setActive(true);
        shippingSchedule.setDeleted(false);

        if (shippingSchedule.getScheduledDate() != null)
            shippingSchedule.setScheduledHour(String.valueOf(shippingSchedule.getScheduledDate().getHour()));

        shippingSchedule.setDriverPairCode(randomDigits());
        shippingSchedule.setUserPairCode(randomDigits());
        shippingSchedule.setExpirationDate(nowAddDays(DateUtils.nowLocalDateTime(), DAYS_EXPIRATION_DATE));
        shippingSchedule.setImmediateDelivery(true);
        shippingSchedule.setUserID(pkg.getUser().getId());

        return shippingScheduleDao.saveShippingSchedule(shippingSchedule);
    }

    private static String randomDigits() {
        return String.valueOf(new Random()
                .ints(MIN, (MAX))
                .limit(1)
                .findFirst()
                .getAsInt());
    }

    /*
    public Date resolveDeliveryDate(DeliveryTerm deliveryTerm) {

        Date newDate = DateUtils.now();

        switch (deliveryTerm) {

            case Term48hs:
                newDate = addWorkingDays(newDate, 2);
                break;
            case NextDay:
                newDate = dayLimit(addWorkingDays(newDate, 1));
                break;
            case SameDay:
                newDate = dayLimit(isWeekendSameDay(newDate));
                break;
            case SameDayExpress:
                newDate = nowAddHours(isWeekendSameDay(newDate), 2);
                break;
            case OneWeek:
                newDate = nowAddDays(newDate, 7);
                break;
        }

        return newDate;
    }*/


    public LocalDateTime resolveDeliveryDate(DeliveryTerm deliveryTerm) {

        LocalDateTime newDate = DateUtils.nowLocalDateTime();

        switch (deliveryTerm) {

            case Term48hs:
                newDate = newDate.plusDays(2);
                break;
            case NextDay:
                newDate = newDate.plusDays(1); //dayLimit(addWorkingDays(newDate, 1));
                break;
            case SameDay:
                newDate = dayLimit(isWeekendSameDay(newDate));
                break;
            case SameDayExpress:
                newDate = nowAddHours(isWeekendSameDay(newDate), 2);
                break;
            case OneWeek:
                newDate = nowAddDays(newDate, 7);
                break;
        }

        return newDate;
    }

    public PaqueryPackage updateShippingsByPackageDto(PaqueryPackage paqueryPackage, PackageDto packageDto) throws BusinessException {

        paqueryPackage.updateShippingSchedule(packageDto.getShippingScheduleOrigin(), ScheduleType.Origin);
        paqueryPackage.updateShippingSchedule(packageDto.getShippingScheduleDestination(), ScheduleType.Destiny);

        paqueryPackage.setShippingScheduleDestination(updateVisitsByDto(paqueryPackage.getShippingScheduleDestination(),
                packageDto.getShippingScheduleDestination()));

        paqueryPackage.setShippingScheduleDestination(updateDistributionZoneByDto(paqueryPackage.getShippingScheduleDestination(),
                packageDto.getShippingScheduleDestination()));

        return paqueryPackage;
    }

    public ShippingSchedule updateVisitsByDto(ShippingSchedule shippingSchedule, ShippingScheduleDto shippingScheduleDto) {

        VisitDto visitDtoOne = shippingScheduleDto.getVisitDtoOne();

        if (visitDtoOne != null) {
            shippingSchedule.getVisitOne().updateVisit(shippingScheduleDto.getVisitDtoOne());
        }

        VisitDto visitDtoTwo = shippingScheduleDto.getVisitDtoTwo();

        if (visitDtoTwo != null) {
            shippingSchedule.getVisitTwo().updateVisit(shippingScheduleDto.getVisitDtoTwo());
        }

        return shippingSchedule;
    }

    public ShippingSchedule updateDistributionZoneByDto(ShippingSchedule shippingSchedule, ShippingScheduleDto shippingScheduleDto) throws BusinessException {
        if (shippingScheduleDto.getDistributionZone() == null ||
                shippingScheduleDto.getDistributionZone().getId() == null)
            return shippingSchedule;

        DistributionZone distributionZone = distributionZoneService.getDistributionZoneByID(shippingScheduleDto.getDistributionZone().getId());

        if (distributionZone == null)
            throw new BusinessException("No existe la zona de Distribucion");

        shippingSchedule.setDistributionZone(distributionZone);

        return shippingSchedule;
    }

    public ShippingSchedule getShippingScheduleDestinyByPackageID(Long packageID){
        return shippingScheduleDao.getShippingScheduleDestinyByPackageID(packageID);
    }
}
