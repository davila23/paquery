package com.paquery.packages.dao;

import com.paquery.commons.enums.OwnerType;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.ScheduleType;
import com.paquery.packages.domain.PaqueryPackage;
import com.paquery.packages.repositories.PackageRepository;
import com.paquery.packages.repositories.PaquerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PackageListDao {

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private PaquerRepository paquerRepository;


    public Page<PaqueryPackage> getPage(String search, List<PackageStatus> statusList, Pageable pageable) {
//        return packageRepository.findBySearchAndStatus(search, statusList, pageable);
        return null;
    }

    public Page<PaqueryPackage> getPageTakedByPaquery(String search, List<PackageStatus> statusList, List<Long> paquersIds, Pageable pageable) {
        return packageRepository.findBySearchAndStatusAndTakedByDrivers(
                concatWildcard(search),
                ScheduleType.Destiny.getValue(),
                statusList.stream().map(PackageStatus::getValue).collect(Collectors.toList()),
                paquersIds,
                pageable
        );
    }

    private String concatWildcard(String search) {
        return "%"+search+"%";
    }

}
