package com.paquery.packages.dto.builder;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.enums.*;
import com.paquery.packages.excel.UploadMassivePackageDto;
import com.paquery.commons.exception.BusinessException;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PackageDtoBuilder {

    @Autowired
    private UserSecurityService userSecurityService;

    public PackageDto build(UploadMassivePackageDto uploadDto) throws BusinessException {

        PackageDto pkg = new PackageDto();
        ShippingScheduleDtoBuilder shippingBuilder = new ShippingScheduleDtoBuilder();
        UserDtoBuilder userDtoBuilder = new UserDtoBuilder();

        pkg.setDetail(uploadDto.getComentariosAdicionales());
        pkg.setCaption(uploadDto.getContenido());
        pkg.setExternalCode(uploadDto.getExternalCode());
        pkg.setEstimatedCost(uploadDto.getValorEstimado());

        pkg.setShippingScheduleOrigin(shippingBuilder.build(uploadDto, ScheduleType.Origin));
        pkg.setShippingScheduleDestination(shippingBuilder.build(uploadDto, ScheduleType.Destiny));

        pkg.setPackageType(PackageType.searchByCode(uploadDto.getTipo()));
        pkg.setPackageSize(PackageSize.searchByCode(uploadDto.getTamanioPaquete()));

        pkg.setUser(userDtoBuilder.build(uploadDto));
        if (uploadDto.getPQ() != null) {
            pkg.setDriverID(uploadDto.getPQ());
        }

        if (uploadDto.getStock() != null)
            pkg.setStockeable(uploadDto.getStock().equalsIgnoreCase("s"));

        if (uploadDto.getPlazo() != null)
            pkg.setDeliveryTerm(DeliveryTerm.searchByCode(uploadDto.getPlazo()));

        // si el usuario pertenece a un mp, le asigna su ownerType y owenerID
        defineOwnerType(pkg, uploadDto);

        return pkg;
    }

    private void defineOwnerType(PackageDto pkg, UploadMassivePackageDto uploadDto) throws BusinessException {

        UserLogged userLogged = userSecurityService.obtainUserLogged();
        if (userLogged == null)
            throw new BusinessException("Usuario sin autenfificacion");

        if (userLogged.getRole().getValue() == UserRoleEnum.OperatorMP.getValue()
                || userLogged.getRole().getValue() == UserRoleEnum.AdminMP.getValue()) {

            pkg.setOwnerType(OwnerType.Marketplace);
            pkg.setOwnerID(userLogged.getOwnerID());

            // si no le asigna los owner del usuario logeado != marketplace
        } else if (userLogged.getOwnerID() != null
                && userLogged.getOwnerType() != OwnerType.PaqueryPoint.getValue()) {

            pkg.setOwnerID(userLogged.getOwnerID());
            pkg.setOwnerType(OwnerType.valueOf(userLogged.getOwnerType()));

            // si no le asigna el campo que viene en el excell MP
        } else if (uploadDto.getMarketPlaceID() != null) {

            pkg.setOwnerType(OwnerType.Marketplace);
            pkg.setOwnerID(uploadDto.getMarketPlaceID());

            // si no le asigna el campo de OPL
        } else if (uploadDto.getLogisticOperatorID() != null) {

            pkg.setOwnerType(OwnerType.LogisticOperator);
            pkg.setOwnerID(uploadDto.getLogisticOperatorID());

        } else {
            // default marketPlace
            pkg.setOwnerType(OwnerType.Marketplace);
            pkg.setOwnerID(new Long(1));
        }
    }
}
