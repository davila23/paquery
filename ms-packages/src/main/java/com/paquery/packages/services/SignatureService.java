package com.paquery.packages.services;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.dto.PackageSignatureDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.exception.BusinessException;
import com.paquery.security.model.UserLogged;
import com.paquery.security.services.IUserSecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import static com.paquery.packages.utils.PathResolverUtil.resolveSignaturePath;


@Service
public class SignatureService {

    private static Logger logger = LoggerFactory.getLogger(SignatureService.class);

    @Autowired
    private ImageService imageService;

    @Autowired
    private PackageStatusService packageStatusService;

    @Autowired
    private IUserSecurityService userSecurityService;

    @Transactional
    public void processSignature(PaqueryPackage paqueryPackage, PackageSignatureDto packageSignatureDto) throws BusinessException {

        logger.info("Firmando package {}, con estado actual {}", paqueryPackage.getExternalCode(), paqueryPackage.getStatus().toString());

        String fileName = addSignatureToPackage(paqueryPackage.getId(), packageSignatureDto.getSignatureData());

        paqueryPackage.setSignatureImage(fileName);
        paqueryPackage.getShippingScheduleDestination().setDestinationDocNumber(packageSignatureDto.getCustomerDocument());
        paqueryPackage.getShippingScheduleDestination().setDestinationAclaration(packageSignatureDto.getCustomerAclaration());

        UserLogged userLogged = this.userSecurityService.obtainUserLogged();

        packageStatusService.changePackageStatus(paqueryPackage, PackageStatus.Delivered, userLogged);

        logger.info("Package {} Firmado entregado.",paqueryPackage.getExternalCode());
    }

    public String addSignatureToPackage(Long id, String file) throws BusinessException {
        if (id == null || StringUtils.isEmpty(file))
            return "";

        String folder = resolveSignaturePath(id,"");

        return imageService.setAtributtesAndSendFile(folder, file);
    }
}
