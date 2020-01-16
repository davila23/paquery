package com.paquery.packages.services;

import com.paquery.packages.dao.PackageDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import static java.lang.String.format;
import static org.springframework.util.Assert.*;

public abstract class AbstractPackageService {

    @Autowired
    private PackageDao packageDao;

    @Autowired
    private MarketplaceService marketplaceService;

    protected static String messageFieldCommon = "El campo %s no puede estar vacio";

    protected void validatePackageDtoCommon(PackageDto packageDto) {
        isTrue(!packageDao.existsByExternalCode(packageDto.getExternalCode()), "Ya existe el Nro_Externo");
        notNull(packageDto.getPackageType(), format(messageFieldCommon, "Tipo"));
        notNull(packageDto.getPackageSize(), format(messageFieldCommon, "Tam_Paquete"));
        hasText(packageDto.getShippingScheduleOrigin().getName(), format(messageFieldCommon, "Origen_Nombre"));
        hasText(packageDto.getShippingScheduleOrigin().getShippingAddress().getAddressDetail(), format(messageFieldCommon, "Origen_Dir"));
    }

    protected PaqueryPackage createCommonPackage(PackageDto packageDto) {
        PaqueryPackage pqPackage = new PaqueryPackage(packageDto);

        if (StringUtils.isEmpty(packageDto.getExternalCode()))
            pqPackage.setExternalCode(marketplaceService.factoryExternalCode(packageDto));

        pqPackage.setStatus(PackageStatus.PendingEntryPaquery);

        pqPackage.setActive(true);
        pqPackage.setDeleted(false);

        if (packageDto.getAdditionalCode() == null)
            pqPackage.setAdditionalCode("");

        if (packageDto.getCode() == null)
            pqPackage.setCode("");

        pqPackage.setCreationDate(DateUtils.nowLocalDateTime());
        pqPackage.setModificationDate(DateUtils.nowLocalDateTime());

        return pqPackage;
    }

    protected void validateFromOriginAndDestinyPackages(PackageDto packageDto){
        validatePackageDtoCommon(packageDto);
        notNull(packageDto.getDeliveryTerm(), format(messageFieldCommon, "Plazo"));
        hasText(packageDto.getShippingScheduleDestination().getName(), format(messageFieldCommon, "Destino_Nombre"));
        hasText(packageDto.getShippingScheduleDestination().getAddressDetail(), format(messageFieldCommon, "Destino_Dir"));

    }
}
