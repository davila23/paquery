package com.paquery.packages.repositories;

import com.paquery.packages.domain.LogStatusPackage;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogStatusPackageRepository extends PagingAndSortingRepository<LogStatusPackage, Long> {

}
