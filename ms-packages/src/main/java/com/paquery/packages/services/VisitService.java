package com.paquery.packages.services;

import com.paquery.commons.dto.VisitDto;
import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.exception.BusinessException;
import com.paquery.packages.domain.Visit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static com.paquery.packages.utils.PathResolverUtil.resolveVisitPath;

@Service
public class VisitService {

    @Autowired
    private com.paquery.packages.dao.VisitDao visitDao;

    @Autowired
    private ImageService imageService;

    public Visit createVisitByDto(VisitDto visitDto, PackageStatus status) {
        Visit visit = new Visit(visitDto);
        visit.setNumberVisit(resolveVisitsNumber(status));
        return visit;
    }

    public Visit saveVisit(Visit visit) {
        return visitDao.saveVisit(visit);
    }

    public String savePhotoVisit(VisitDto visitDto, Long id) throws BusinessException {

        if (id == null || StringUtils.isEmpty(visitDto.getPhoto()))
            return "";

        String folder = resolveVisitPath(id, "");

        return imageService.setAtributtesAndSendFile(folder, visitDto.getPhoto());
    }

    public static Integer resolveVisitsNumber(PackageStatus packageStatus) {
        Integer numberVisit = 0;
        if (packageStatus.getValue() == PackageStatus.DeliveryAttempt1.getValue()) {
            numberVisit = 1;
        } else if (packageStatus.getValue() == PackageStatus.DeliveryAttempt2.getValue()) {
            numberVisit = 2;
        }
        return numberVisit;
    }

    public String addVisitImageToShipping(Long id, VisitDto visitDto) throws BusinessException {
        if (id == null || StringUtils.isEmpty(visitDto.getPhoto()) || StringUtils.isEmpty(visitDto.getPhotoName()))
            return "";

        String folder = resolveVisitPath(id, "");

        return imageService.setAtributtesAndSendFile(folder, visitDto.getPhoto());
    }
}
