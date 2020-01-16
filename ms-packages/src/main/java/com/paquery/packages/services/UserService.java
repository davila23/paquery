package com.paquery.packages.services;

import com.paquery.packages.dao.UserAccountDao;
import com.paquery.packages.dao.UserDao;
import com.paquery.packages.domain.User;
import com.paquery.packages.domain.UserAccount;
import com.paquery.commons.dto.UserDto;
import com.paquery.commons.enums.*;
import com.paquery.commons.utils.DateUtils;
import org.apache.commons.text.RandomStringGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static com.paquery.commons.utils.CodeUtils.generateCustomCode;

@Service
public class UserService implements IUserService {

    private static final String USER_PAQUERY_DEFAULT_CUSTOMER = "user@paquery.com";

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserAccountDao userAccountDao;

    @Override
    public User getOrCreateUser(UserDto userDto) {
        User user = existByEmailOrMobile(userDto.getEmail(), userDto.getMobile());
        if (user != null)
            return user;
        if (StringUtils.isEmpty(userDto.getMobile())
                && StringUtils.isEmpty(userDto.getEmail())) {
            return createUserDefault();
        } else if (!StringUtils.isEmpty(userDto.getEmail())
                || !StringUtils.isEmpty(userDto.getMobile())) {
            return createUserPreRegistration(userDto);
        }
        return null;
    }

    @Override
    public User createUserPreRegistration(UserDto userDto) {
        String[] nameAndLastName = splitName(userDto);

        User user = new User(userDto.getEmail(),
                userDto.getMobile(),
                nameAndLastName[0],
                !StringUtils.isEmpty(userDto.getLastName()) ? userDto.getLastName() : nameAndLastName.length > 1 ? nameAndLastName[1] : "",
                createPassword(8), "",
                CustomerStatus.PreRegistration.intValue(), UserRoleEnum.Customer.intValue());
        user = setCommonAtributtes(user);
        return saveNewUser(user);
    }

    public static String[] splitName(UserDto userDto) {
        String[] array = {userDto.getName()!= null ? userDto.getName() : ""};

        if (StringUtils.isEmpty(array[0]))
            return array;

        if (userDto.getName().contains(" "))
            return userDto.getName().split(" ");

        return array;
    }

    @Override
    public User createUserDefault() {
        User defaultUser = existByEmailOrMobile(USER_PAQUERY_DEFAULT_CUSTOMER, "");
        if (defaultUser != null)
            return defaultUser;
        // se crea una sola vez en el sistema
        User user = new User(USER_PAQUERY_DEFAULT_CUSTOMER,
                "",
                "",
                "",
                createPassword(8),
                "",
                CustomerStatus.PreRegistration.intValue(),
                UserRoleEnum.Customer.intValue());
        user = setCommonAtributtes(user);
        return saveNewUser(user);
    }

    @Override
    public User existByEmailOrMobile(String email, String mobile) {
        //TODO si existe y tengo mobile le doy update?
        User user = null;
        if (!StringUtils.isEmpty(email))
            user = userDao.getByEmail(email);

        if (user != null)
            return user;

        if (!StringUtils.isEmpty(mobile))
            return userDao.getByMobile(mobile);
        return null;
    }

    private String createPassword(int size) {
        RandomStringGenerator pwdGenerator = new RandomStringGenerator
                .Builder().withinRange('0', 'z')
                .build();
        return pwdGenerator.generate(size);
    }

    private User setCommonAtributtes(User user) {
        user.setSaltKey("");
        if (StringUtils.isEmpty(user.getMobile()))
            user.setMobile("");
        user.setCreationDate(DateUtils.nowLocalDateTime());
        user.setDocNumber("");
        user.setDocType(DocType.Dni.getValue());
        user.setUserType(UserType.Customer.getValue());//TODO POR AHORA SOLO CUSTOMER
//        if (user.getOwnerID() == null || user.getOwnerID() <= 0)
//            user.setOwnerType(OwnerType.Customer.getValue());
        user.setActive(true);
        user.setDeleted(false);
        user.setSource(SourceType.Website.getValue());
        user.setCode(""); //una vez guardado lo genero con el ID
        user.setAuthMode(0);// POR DEFAULT EN LA BASE ES 0
        user.setTermsAndConditions(0);// POR DEFAULT EN LA BASE ES 0
        return user;
    }

    @Override
    public User saveNewUser(User user) {
        // creo el usuario y obtengo el ID para crear su CODE y vuelvo a guardar, creo su userAccount la salvo
        User newUser = userDao.createUser(user);
        createUserAccount(newUser);
        newUser.setCode(generateCustomCode(newUser.getId(), 8));
        return userDao.createUser(newUser);
    }

    private void createUserAccount(User user) {
        userAccountDao.saveUserAccount(new UserAccount(user.getId()));
    }
}
