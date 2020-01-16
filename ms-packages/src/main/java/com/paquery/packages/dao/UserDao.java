package com.paquery.packages.dao;

import com.paquery.packages.domain.User;
import com.paquery.packages.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDao {

    @Autowired
    private UserRepository userRepository;

    public User getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    public User getMobile(String mobile) {
        return userRepository.getByMobile(mobile);
    }

    public User getByMobile(String mobile) {
        return userRepository.getByMobile(mobile);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
}
