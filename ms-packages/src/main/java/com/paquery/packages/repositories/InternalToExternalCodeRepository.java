package com.paquery.packages.repositories;

import com.paquery.packages.domain.InternalToExternalCode;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InternalToExternalCodeRepository extends PagingAndSortingRepository<InternalToExternalCode, Long> {

    @Query("select internal from InternalToExternalCode internal" +
            " where internal.marketPlaceID=:marketplaceID" +
            " and internal.active=true" +
            " and internal.deleted=false")
    InternalToExternalCode getInternalToExternalCodeByMarketPlaceID(@Param("marketplaceID") Long marketplaceID);
}
