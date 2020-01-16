package com.paquery.packages.dao;

import com.paquery.commons.enums.ScheduleType;
import com.paquery.packages.domain.ShippingSchedule;
import com.paquery.packages.repositories.ShippingScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class ShippingScheduleDao {

    @Autowired
    private ShippingScheduleRepository shippingScheduleRepository;

    public List<ShippingSchedule> getShippingScheduleByPackageID(Long id) {
        return shippingScheduleRepository.getShippingScheduleByPackageID(id);
    }

    public ShippingSchedule getShippingScheduleByID(Long id) {
        return shippingScheduleRepository.findById(id).get();
    }

    public ShippingSchedule getShippingScheduleVisistsByID(Long shippingScheduleID) {
        return shippingScheduleRepository.getShippingScheduleVisistsByID(shippingScheduleID, ScheduleType.Destiny.getValue());
    }

    public void saveAll(Set<ShippingSchedule> shipping) {
        shippingScheduleRepository.saveAll(shipping);
    }

    public ShippingSchedule saveShippingSchedule(ShippingSchedule shippingSchedule) {
        return this.shippingScheduleRepository.save(shippingSchedule);
    }

    public ShippingSchedule getShippingScheduleDestinyByPackageID(Long packageID){
        return shippingScheduleRepository.getShippingScheduleByPackageID(packageID, ScheduleType.Destiny.getValue());
    }
}
