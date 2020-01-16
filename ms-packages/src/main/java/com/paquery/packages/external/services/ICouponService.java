package com.paquery.packages.external.services;

import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.commons.exception.BusinessException;

import java.util.Map;

public interface ICouponService {

    Map checkCoupon(PaqueryPackage paqueryPackage) throws Exception;

    Map redeemCoupon(PaqueryPackage paqueryPackage) throws Exception;

}
