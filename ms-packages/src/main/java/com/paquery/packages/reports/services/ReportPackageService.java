package com.paquery.packages.reports.services;

import com.paquery.packages.dao.PackageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportPackageService {

    @Autowired
    private PackageDao packageDao;


    public List getPackageInfoReadyToExpire() {
        return packageDao.getRawPackageInfoReadyToExpire();
    }

}
