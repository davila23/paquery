package com.paquery.packages.dao;

import com.paquery.packages.domain.Marketplace;
import com.paquery.packages.repositories.MarketplaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MarketplaceDao {

    @Autowired
    private MarketplaceRepository marketplaceRepository;

    public Marketplace getMarketplaceByID(Long marketplaceID) {
        Marketplace marketplace = marketplaceRepository.findById(marketplaceID).orElse(null);
        return marketplace;
    }

    public Boolean isStockeable(Long marketplaceID) {
//        return marketplaceRepository.isStockeable(marketplaceID);

        Optional<Marketplace> marketplace = marketplaceRepository.findById(marketplaceID);

        if (marketplace.isPresent())
            return marketplace.get().getStock();

        return null;
    }
}
