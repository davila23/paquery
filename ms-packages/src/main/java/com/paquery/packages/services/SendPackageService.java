package com.paquery.packages.services;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import com.paquery.packages.model.ResultCreatePackage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static com.paquery.commons.utils.CodeUtils.generateCustomCode;

@Service
public class SendPackageService extends AbstractPackageService implements ICreatePackageService {

    private static Logger logger = LoggerFactory.getLogger(SendPackageService.class);

    @Autowired
    private IUserService userService;

    @Autowired
    private ShippingScheduleService shippingScheduleService;

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private PackageService packageService;

    @Override
    public ResultCreatePackage createPackageMassive(PackageDto packageDto) {

        try {
            PaqueryPackage pqPackage = createCommonPackage(packageDto);

            User user = userService.getOrCreateUser(packageDto.getUser());

            user = packageService.resolveOwnersUserByPackage(user, packageDto);

            pqPackage.setUser(user);
            pqPackage.setPackageType(PackageType.Send);

            PaqueryPackage savePackage = packageDao.save(pqPackage);
            savePackage.setCode(generateCustomCode(savePackage.getId(), 8));

            packageDao.save(savePackage);

            shippingScheduleService.createShippingSchedule(packageDto.getShippingScheduleOrigin(), packageDto, savePackage, ScheduleType.Origin);

            shippingScheduleService.createShippingSchedule(packageDto.getShippingScheduleDestination(), packageDto, savePackage, ScheduleType.Destiny);

            return ResultCreatePackage.ok(savePackage.getId());
        } catch (
                Exception e) {
            logger.error("Error procesoando alta de package send con externalCode: " + packageDto.getExternalCode(), e);
            return ResultCreatePackage.withError(e.getMessage());
        }
    }

    @Override
    public void validate(PackageDto packageDto) throws BusinessException {
        try {
            validateFromOriginAndDestinyPackages(packageDto);
        } catch (IllegalArgumentException e) {
            throw new BusinessException(e.getMessage());
        }
    }
}
