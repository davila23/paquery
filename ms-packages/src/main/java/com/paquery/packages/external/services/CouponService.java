package com.paquery.packages.external.services;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.external.dao.ExternalServiceCredentialsDao;
import com.paquery.packages.external.domain.ExternalServiceCredentials;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CouponService implements ICouponService {

    private static Logger logger = LoggerFactory.getLogger(CouponService.class);

    @Autowired
    private RequestExternalService requestExternalService;

    @Autowired
    private ExternalServiceCredentialsDao serviceCredentialsDao;

    private ExternalServiceCredentials resolveCredentialsByOwner(PaqueryPackage paqueryPackage) throws BusinessException {
        ExternalServiceCredentials credentials = serviceCredentialsDao.findCredentialsByOwner(paqueryPackage);
        if (credentials == null)
            throw new BusinessException("No existe relacion con servicio externo para %s", paqueryPackage.getExternalCode());
        return credentials;
    }

    @Override
    public Map checkCoupon(PaqueryPackage paqueryPackage) throws Exception {

        ExternalServiceCredentials credentials = resolveCredentialsByOwner(paqueryPackage);
        String coupon = paqueryPackage.getExternalCode();

        logger.info("consultando cupon: {}", coupon);

        Map result = requestExternalService.checkCoupon(coupon, credentials);

        logger.info("resultdo consulta cupon {} : {}", coupon, result);

        return result;
    }

    @Override
    public Map redeemCoupon(PaqueryPackage paqueryPackage) throws Exception {

        ExternalServiceCredentials credentials = resolveCredentialsByOwner(paqueryPackage);

        String coupon = paqueryPackage.getExternalCode();

        logger.info("VALIDANDO cupon: {}", coupon);

        Map result = requestExternalService.redeemCoupon(coupon, credentials);

        logger.info("Resultado VALIDACION cupon {} : {}", coupon, result);

        return result;
    }
}
