package com.paquery.packages.services;

import com.paquery.packages.dao.ShippingAddressDao;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.ShippingAddress;
import com.paquery.commons.dto.ShippingAddressDto;
import com.paquery.commons.enums.AddressType;
import com.paquery.packages.maps.response.W3wResponse;
import com.paquery.packages.maps.service.MapsService;
import com.paquery.commons.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ShippingAddressService {

    @Autowired
    private ShippingAddressDao shippingAddressDao;

    @Autowired
    private MapsService mapsService;

    public ShippingAddress createShippingAddressByDto(ShippingAddressDto shippingAddressDto) {
        return new ShippingAddress(shippingAddressDto);
    }

    public ShippingAddress createShippingAddres(ShippingAddressDto shippingAddressDto, PaqueryPackage paqueryPackage) {

        ShippingAddress shiAddress = createShippingAddressByDto(shippingAddressDto);
        shiAddress = resolvew3wAddress(shiAddress);
        if (StringUtils.isEmpty(shiAddress.getCreationDate()))
            shiAddress.setCreationDate(DateUtils.nowLocalDateTime());
        shiAddress.setShow(false);
        shiAddress.setDeleted(false);
        shiAddress.setActive(true);
        shiAddress.setAddressType(AddressType.Temp.getValue());
        if (StringUtils.isEmpty(shiAddress.getComment()))
            shiAddress.setComment("");
        shiAddress.setUserID(paqueryPackage.getUser().getId());

        return shippingAddressDao.saveShippingAddress(shiAddress);
    }

    private ShippingAddress resolvew3wAddress(ShippingAddress shippingAddress) {
        W3wResponse w3wData = mapsService.getW3wInfoByAddress(shippingAddress.getAddressDetail());

        if (w3wData == null)
            return shippingAddress;

        shippingAddress.setGeoKey(w3wData.getWords());
        shippingAddress.setLat(w3wData.getGeometry().getLat());
        shippingAddress.setLng(w3wData.getGeometry().getLng());

        return shippingAddress;
    }
}
