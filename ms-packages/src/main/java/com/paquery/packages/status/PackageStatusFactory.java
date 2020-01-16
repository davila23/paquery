package com.paquery.packages.status;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.enums.PackageType;
import com.paquery.commons.exception.BusinessException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PackageStatusFactory {

    @Autowired
    private List<IPackageStatusService> packageStatusServiceList;

    private Map<PackageType, IPackageStatusService> services;

    @PostConstruct
    void init() throws BusinessException {
        services = new HashMap<>();

        for (IPackageStatusService pkgService : packageStatusServiceList) {
            if (services.containsKey(pkgService.getPackageType()))
                throw new BusinessException("Ya existe servicio para packageType %s", pkgService.getPackageType());

            services.put(pkgService.getPackageType(), pkgService);
        }

    }


    public IPackageStatusService getStatusService(PackageType packageType) throws BusinessException {
        IPackageStatusService service = services.get(packageType);
        return service;
    }

    public Map<PackageType, Collection<PackageStatus>> getPackageStatusByPackageType() {

        Map result = new HashMap();

        for (IPackageStatusService pkgService : packageStatusServiceList) {
            result.put(pkgService.getPackageType(), pkgService.getAllowedStatus());
        }

        return result;
    }

}
