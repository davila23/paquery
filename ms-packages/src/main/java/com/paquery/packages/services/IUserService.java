package com.paquery.packages.services;

import com.paquery.packages.domain.User;
import com.paquery.commons.dto.UserDto;

public interface IUserService {

    User existByEmailOrMobile(String email, String mobile);

    User createUserPreRegistration(UserDto userDto);

    User createUserDefault();

    User getOrCreateUser(UserDto userDto);

    User saveNewUser(User user);
}
