package com.paquery.packages.lists;


import com.paquery.security.UserRoleEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PackageListFactory {

    @Autowired
    private List<IPackageListService> services;


    public IPackageListService getListService(UserRoleEnum userRoleEnum) {
        for (IPackageListService listService : services) {
            if (listService.applyRole(userRoleEnum))
                return listService;
        }

        return null;
    }
}
