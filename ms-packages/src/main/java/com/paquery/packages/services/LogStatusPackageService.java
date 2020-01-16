package com.paquery.packages.services;

import com.paquery.packages.domain.LogStatusPackage;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.domain.User;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.packages.repositories.LogStatusPackageRepository;
import com.paquery.security.model.UserLogged;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
public class LogStatusPackageService {

    @Autowired
    private LogStatusPackageRepository logStatusPackageRepository;

    public void saveAll(Set<LogStatusPackage> logs) {
        logStatusPackageRepository.saveAll(logs);
    }

    public void save(LogStatusPackage logs) {
        logStatusPackageRepository.save(logs);
    }

    public void createLogStatusPackage(PaqueryPackage paqueryPackage, PackageStatus previusStatus, User user) {
        LogStatusPackage logStatus = new LogStatusPackage(paqueryPackage,
                previusStatus,
                paqueryPackage.getStatus(),
                user != null ? user.getId() : 0,
                user != null ? user.getEmail() : "");

        logStatusPackageRepository.save(logStatus);
    }

    public void createLogStatusPackage(PaqueryPackage paqueryPackage, PackageStatus nextStatus, UserLogged user) {
        LogStatusPackage logStatus = new LogStatusPackage(paqueryPackage,
                paqueryPackage.getStatus(),
                nextStatus,
                user != null ? user.getId() : 0,
                user != null ? user.getEmail() : "");

        logStatusPackageRepository.save(logStatus);
    }
}
