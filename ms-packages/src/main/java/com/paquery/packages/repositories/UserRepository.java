package com.paquery.packages.repositories;

import com.paquery.packages.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Query("select user " +
            "FROM User user" +
            " where user.active = true" +
            " and user.deleted = false" +
            " and user.email=:email")
    User getByEmail(@Param("email") String email);

    @Query(" select user " +
            " FROM User user " +
            " where user.active = true" +
            " and user.deleted = false" +
            " and (user.email =:email or user.mobile =:mobile )")
    User getByEmailOrMobile(@Param("email") String email, @Param("mobile") String mobile);

    @Query(" select user" +
            " FROM User user " +
            " where user.active = true" +
            " and user.deleted = false" +
            " and user.mobile=:mobile")
    User getByMobile(@Param("mobile") String mobile);
}
