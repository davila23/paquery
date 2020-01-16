package com.paquery.packages.services;

import com.paquery.packages.dao.InternalToExternalCodeDao;
import com.paquery.packages.dao.MarketplaceDao;
import com.paquery.packages.domain.InternalToExternalCode;
import com.paquery.packages.domain.Marketplace;
import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.exception.BusinessException;
import com.paquery.commons.utils.CodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarketplaceService {

    @Autowired
    private MarketplaceDao marketplaceDao;

    @Autowired
    private InternalToExternalCodeDao internalToExternalCodeDao;

    public Marketplace getMarketplaceByID(Long id) {
        return marketplaceDao.getMarketplaceByID(id);
    }

    public Boolean isStockeable(Long id) throws BusinessException {
        Boolean isStockeable = marketplaceDao.isStockeable(id);

        if (isStockeable == null)
            throw new BusinessException("No existe marketplace o no ha sido borrado");

        return isStockeable;
    }

    public String factoryExternalCode(PackageDto packageDto) {


        InternalToExternalCode internalToExternalCode = internalToExternalCodeDao
                .getInternalToExternalCodeByMarketPlaceID(packageDto.getOwnerID());

        if (internalToExternalCode != null) {
            internalToExternalCode.setInternalToExternalCodeID(internalToExternalCode.getInternalToExternalCodeID() + 1);
        } else {
            internalToExternalCode = new InternalToExternalCode(packageDto.getOwnerID(), new Long(1));
        }

        internalToExternalCode = internalToExternalCodeDao
                .saveInternalToExternalCode(internalToExternalCode);

        StringBuilder sb = new StringBuilder();
        sb.append(CodeUtils.generateCustomCode(packageDto.getOwnerID(), 4));
        sb.append("-");
        sb.append(CodeUtils.generateCustomCode(internalToExternalCode.getInternalToExternalCodeID(), 8));

        return sb.toString();
    }
}
