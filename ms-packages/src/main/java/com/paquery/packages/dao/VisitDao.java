package com.paquery.packages.dao;

import com.paquery.packages.domain.Visit;
import com.paquery.packages.repositories.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class VisitDao {

    @Autowired
    private VisitRepository visitRepository;

    public Visit getVisitByID(Long id) {
        return visitRepository.findById(id).get();
    }

    public Visit saveVisit(Visit visit) {
        return visitRepository.save(visit);
    }

//    public Set<Visit> getVisitsByShippingScheduleID(Long shippingScheduleID) {
//        return visitRepository.getVisitsByShippingScheduleID(shippingScheduleID);
//    }
}
