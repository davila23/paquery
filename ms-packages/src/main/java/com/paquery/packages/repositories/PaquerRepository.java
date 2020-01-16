package com.paquery.packages.repositories;

import com.paquery.packages.domain.Paquer;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaquerRepository extends PagingAndSortingRepository<Paquer, Long> {
    @Query("select case when count(p)> 0 then true else false end from Paquer p where p.id=:idPaquer and p.active=true")
    boolean existsPaquerActivedByID(@Param("idPaquer")long idPaquer);

    @Query( value =
            " SELECT dToOpl.DriverID FROM PQ_DriverToLogisticOperator dToOpl" +
            " WHERE dToOpl.Active = 1 AND ( dToOpl.Deleted is null OR dToOpl.Deleted = 0 )" +
            " AND dToOpl.LogisticOperatorID = ?1 ",
            nativeQuery = true)
    List<Long> getIdsByLogisticOperatorOwner(Long ownerID);

}
