package com.paquery.packages.utils;

import com.paquery.commons.dto.UserDto;
import com.paquery.packages.services.UserService;
import org.junit.Assert;
import org.junit.Test;

public class UserTest {

    @Test
    public void splitName() {
        UserDto user = new UserDto();

        user.setName("Emanuel Acosta");
        String[] array = UserService.splitName(user);
        Assert.assertEquals("Emanuel", array[0]);
        Assert.assertEquals("Acosta", array[1]);

        user.setName("Emanuel");
        array = UserService.splitName(user);
        Assert.assertEquals("Emanuel", array[0]);
        Assert.assertEquals(1, array.length);


        user.setName("");
        array = UserService.splitName(user);
        Assert.assertEquals("", array[0]);
        Assert.assertEquals(1, array.length);

        user.setName(null);
        array = UserService.splitName(user);
        Assert.assertEquals("", array[0]);
        Assert.assertEquals(1, array.length);

    }
}
