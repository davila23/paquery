package com.paquery.packages.external.services;

public interface ExternalCouponService {

    void checkCoupon(String couponCode);

    void redeemCoupon(String couponCode);
}
