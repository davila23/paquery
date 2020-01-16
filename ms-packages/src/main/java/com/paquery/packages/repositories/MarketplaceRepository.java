package com.paquery.packages.repositories;

import com.paquery.packages.domain.Marketplace;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MarketplaceRepository extends PagingAndSortingRepository<Marketplace, Long> {

    @Query("select m.stock from Marketplace m where m.id=:marketplaceID and m.active=true and m.deleted=false")
    Boolean isStockeable(@Param("marketplaceID") Long marketplaceID);
}
