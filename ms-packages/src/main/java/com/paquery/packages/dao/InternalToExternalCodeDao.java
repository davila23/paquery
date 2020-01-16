package com.paquery.packages.dao;

import com.paquery.packages.domain.InternalToExternalCode;
import com.paquery.packages.repositories.InternalToExternalCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InternalToExternalCodeDao {

    @Autowired
    private InternalToExternalCodeRepository internalToExternalCodeRepository;

    public InternalToExternalCode getInternalToExternalCodeByMarketPlaceID(Long marketplaceID) {
        return internalToExternalCodeRepository.getInternalToExternalCodeByMarketPlaceID(marketplaceID);
    }

    public InternalToExternalCode saveInternalToExternalCode(InternalToExternalCode internalToExternal) {
        return internalToExternalCodeRepository.save(internalToExternal);
    }
}
