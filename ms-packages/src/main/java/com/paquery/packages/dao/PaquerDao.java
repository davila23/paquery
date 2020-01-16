package com.paquery.packages.dao;

import com.paquery.commons.enums.OwnerType;
import com.paquery.packages.domain.Paquer;
import com.paquery.packages.repositories.PaquerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class PaquerDao {

    @Autowired
    private PaquerRepository paquerRepository;

    public boolean existsPaquerActivedByID(Long id) {
        return paquerRepository.existsPaquerActivedByID(id);
    }

    public List<Long> getPaquerIdsByOwner(Long ownerId, OwnerType ownerType ) {
        if (OwnerType.LogisticOperator.equals(ownerType))
            return paquerRepository.getIdsByLogisticOperatorOwner(ownerId);

        return Arrays.asList();
    }

    public Paquer getPaquerByID(Long id) {
        return paquerRepository.findById(id).get();
    }
}
