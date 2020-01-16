package com.paquery.packages.repositories;

import com.paquery.packages.domain.UserAccount;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends PagingAndSortingRepository<UserAccount, Long> {

}
