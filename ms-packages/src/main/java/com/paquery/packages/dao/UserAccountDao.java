package com.paquery.packages.dao;

import com.paquery.packages.domain.UserAccount;
import com.paquery.packages.repositories.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserAccountDao {

    @Autowired
    private UserAccountRepository userAccountRepository;

    public UserAccount saveUserAccount(UserAccount userAccount) {
        return userAccountRepository.save(userAccount);
    }
    public UserAccount findByID(Long userAccountID) {
        return userAccountRepository.findById(userAccountID).get();
    }
}
