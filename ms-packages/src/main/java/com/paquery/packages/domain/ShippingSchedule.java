package com.paquery.packages.domain;

import com.paquery.commons.dto.ShippingScheduleDto;
import com.paquery.commons.enums.ScheduleType;

import javax.persistence.*;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "PQ_ShippingSchedule")
public class ShippingSchedule {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Comment")
    private String comment;

    @Column(name = "AddressDetail")
    private String addressDetail;

    @Column(name = "DestinationEmail")
    private String destinationEmail;

    @Column(name = "ScheduleType")
    private Integer scheduleType;

    @OneToOne
    @JoinColumn(name = "DriverID")
    private Paquer paquer;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "UserID")
    private Long userID;

    @Column(name = "DriverPairCode")
    private String driverPairCode;

    @Column(name = "UserPairCode")
    private String userPairCode;

    @Column(name = "ExpirationDate")
    private LocalDateTime expirationDate;

    @Column(name = "ScheduledDate")
    private LocalDateTime scheduledDate;

    @Column(name = "ScheduledHour")
    private String scheduledHour;

    @Column(name = "DestinationAclaration")
    private String destinationAclaration;

    @Column(name = "DestinationDocNumber")
    private String destinationDocNumber;

    @Column(name = "IsImmediateDelivery")
    private Boolean isImmediateDelivery;

    @OneToOne
    @JoinColumn(name = "ShippingAddressID")
    private ShippingAddress shippingAddress;

    @OneToOne
    @JoinColumn(name = "DistributionZoneID")
    private DistributionZone distributionZone;

    @OneToMany(mappedBy = "shippingSchedule")
    private List<Visit> visits;

    @ManyToOne
    @JoinColumn(name = "PackageID")
    private PaqueryPackage paqueryPackage;

    public ShippingSchedule(ShippingScheduleDto shippingScheduleDto) {
        this.name = shippingScheduleDto.getName();
        this.comment = shippingScheduleDto.getComment();
        this.destinationEmail = shippingScheduleDto.getEmail();
        //TODO REVISAR SI SE SETEA EN EL ALTA MASIVA SIEMPRE EN TRUE.
        this.isImmediateDelivery =
                shippingScheduleDto.getImmediateDelivery() != null
                        ? shippingScheduleDto.getImmediateDelivery() : true;
    }

    public void updateShippingAddress(ShippingScheduleDto shippingScheduleDto) {
        this.shippingAddress.updateShippingAddress(shippingScheduleDto.getShippingAddress());
    }

    public void updatePaquerAssign(Paquer paquer) {
        this.paquer = paquer;
    }

    public ShippingSchedule() {
    }

    public Paquer getPaquer() {
        return paquer;
    }

    public void setPaquer(Paquer paquer) {
        this.paquer = paquer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getDestinationEmail() {
        return destinationEmail;
    }

    public void setDestinationEmail(String destinationEmail) {
        this.destinationEmail = destinationEmail;
    }

    public PaqueryPackage getPaqueryPackage() {
        return paqueryPackage;
    }

    public void setPaqueryPackage(PaqueryPackage paqueryPackage) {
        this.paqueryPackage = paqueryPackage;
    }

    public ScheduleType getScheduleType() {
        return ScheduleType.valueOf(scheduleType);
    }

    public void setScheduleType(ScheduleType scheduleType) {
        this.scheduleType = scheduleType.getValue();
    }

    public ShippingAddress getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(ShippingAddress shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public void setScheduleType(Integer scheduleType) {
        this.scheduleType = scheduleType;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getDriverPairCode() {
        return driverPairCode;
    }

    public void setDriverPairCode(String driverPairCode) {
        this.driverPairCode = driverPairCode;
    }

    public String getUserPairCode() {
        return userPairCode;
    }

    public void setUserPairCode(String userPairCode) {
        this.userPairCode = userPairCode;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public LocalDateTime getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDateTime scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public String getScheduledHour() {
        return scheduledHour;
    }

    public void setScheduledHour(String scheduledHour) {
        this.scheduledHour = scheduledHour;
    }

    public Boolean getImmediateDelivery() {
        return isImmediateDelivery;
    }

    public void setImmediateDelivery(Boolean immediateDelivery) {
        isImmediateDelivery = immediateDelivery;
    }

    public String getDestinationAclaration() {
        return destinationAclaration;
    }

    public void setDestinationAclaration(String destinationAclaration) {
        this.destinationAclaration = destinationAclaration;
    }

    public String getDestinationDocNumber() {
        return destinationDocNumber;
    }

    public void setDestinationDocNumber(String destinationDocNumber) {
        this.destinationDocNumber = destinationDocNumber;
    }

    public DistributionZone getDistributionZone() {
        return distributionZone;
    }

    public void setDistributionZone(DistributionZone distributionZone) {
        this.distributionZone = distributionZone;
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public Visit getVisitOne() {
        if (this.visits.size() != 0)
            return visits.stream().filter(visit -> visit.getNumberVisit() == 1).findFirst().orElse(null);
        return null;
    }

    public Visit getVisitTwo() {
        if (this.visits.size() != 0)
            return visits.stream().filter(visit -> visit.getNumberVisit() == 2).findFirst().orElse(null);
        return null;
    }

    public void setVisitsOne(Visit visit) {
        if (this.visits == null) {
            this.visits = new ArrayList<>();
            this.visits.remove(getVisitOne());
        }
        this.visits.add(visit);
    }

    public void setVisitsTwo(Visit visit) {
        if (this.visits == null) {
            this.visits = new ArrayList<>();
            this.visits.remove(getVisitTwo());
        }
        this.visits.add(visit);
    }
}
