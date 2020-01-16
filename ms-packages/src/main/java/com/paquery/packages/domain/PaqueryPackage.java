package com.paquery.packages.domain;

import com.paquery.commons.dto.PackageDto;
import com.paquery.commons.dto.ShippingScheduleDto;
import com.paquery.commons.enums.*;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "PQ_Package")
public class PaqueryPackage {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Caption")
    private String caption;

    @Column(name = "Code")
    private String code;

    @Column(name = "AdditionalCode")
    private String additionalCode;

    @Column(name = "Detail")
    private String detail;

    @Column(name = "Status")
    private Integer status;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "ExternalCode")
    private String externalCode;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "ExternalTypeCode")
    private Integer extenalTypeCode;

    @Column(name = "PackageSize")
    private Integer packageSize;

    @Column(name = "PackageType")
    private Integer packageType;

    @Column(name = "Rate")
    private Double rate;

    @Column(name = "OwnerType")
    private Integer ownerType;

    @Column(name = "OwnerID")
    private Long ownerID;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @Column(name = "ModificationDate")
    private LocalDateTime modificationDate;

    @Column(name = "ArrivedAtPaqueryPointDate")
    private LocalDateTime arrivedAtPaqueryPointDate;

    @Column(name = "CancelationDate")
    private LocalDateTime cancelationDate;

    @Column(name = "DeliveryDate")
    private LocalDateTime deliveryDate;

    @Column(name = "SignatureImage")
    private String signatureImage;

    @Column(name = "Avatar")
    private String avatar;

    @ManyToOne
    @JoinColumn(name = "UserID")
    private User user;

    @Column(name = "EstimatedCost")
    private Double estimatedCost;

    @Column(name = "RollContainerPosition")
    private String rollContainerPosition;

    @Column(name = "RollContainerStatus")
    private Boolean rollContainerStatus;

    @Column(name = "DeliveryTerm")
    private Integer deliveryTerm;

    @OneToMany(mappedBy = "paqueryPackage")
    private Set<ShippingSchedule> shippingSchedules;

    @OneToMany(mappedBy = "paqueryPackage")
    private Set<LogStatusPackage> logStatusPackages;

    public PaqueryPackage(PackageDto packageDto) {
        this.externalCode = packageDto.getExternalCode();
        this.packageType = packageDto.getPackageType().getValue();
        this.caption = packageDto.getCaption();
        this.detail = packageDto.getDetail();
        this.estimatedCost = packageDto.getEstimatedCost();
        this.packageSize = packageDto.getPackageSize().getValue();
        this.deliveryTerm = (packageDto.getDeliveryTerm() != null) ? packageDto.getDeliveryTerm().getValue() : null;
        this.ownerType = (packageDto.getOwnerType() != null) ? packageDto.getOwnerType().getValue() : null;
        this.ownerID = packageDto.getOwnerID();
        this.code = packageDto.getCode();
    }

    public PaqueryPackage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Integer getStatusInt() {
        return status;
    }

    public PackageStatus getStatus() {
        return PackageStatus.valueOf(status);
    }

    public void setStatus(PackageStatus status) {
        this.status = status.getValue();
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

    public String getExternalCode() {
        return externalCode;
    }

    public void setExternalCode(String externalCode) {
        this.externalCode = externalCode;
    }

    public Integer getExtenalTypeCode() {
        return extenalTypeCode;
    }

    public void setExtenalTypeCode(Integer extenalTypeCode) {
        this.extenalTypeCode = extenalTypeCode;
    }

    public PackageSize getPackageSize() {
        return PackageSize.valueOf(packageSize);
    }

    public void setPackageSize(PackageSize packageSize) {
        this.packageSize = packageSize.getValue();
    }

    public PackageType getPackageType() {
        return PackageType.valueOf(packageType);
    }

    public void setPackageType(PackageType packageType) {
        this.packageType = packageType.getValue();
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public OwnerType getOwnerType() {
        return OwnerType.valueOf(ownerType);
    }

    public void setOwnerType(OwnerType ownerType) {
        this.ownerType = ownerType.getValue();
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }

    public LocalDateTime getCancelationDate() {
        return cancelationDate;
    }

    public void setCancelationDate(LocalDateTime cancelationDate) {
        this.cancelationDate = cancelationDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(Double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public DeliveryTerm getDeliveryTerm() {
        if (deliveryTerm == null)
            return null;
        return DeliveryTerm.valueOf(deliveryTerm);
    }

    public void setDeliveryTerm(DeliveryTerm deliveryTerm) {
        this.deliveryTerm = deliveryTerm.getValue();
    }

    public Set<ShippingSchedule> getShippingSchedules() {
        return shippingSchedules;
    }

    public void setShippingSchedules(Set<ShippingSchedule> shippingSchedules) {
        this.shippingSchedules = shippingSchedules;
    }

    public ShippingSchedule getShippingScheduleOrigin() {
        if (this.shippingSchedules != null)
            return getShippingByScheduleType(ScheduleType.Origin);
        return null;
    }

    public void setShippingScheduleOrigin(ShippingSchedule shippingScheduleOrigin) {
        if (this.shippingSchedules == null) {
            this.shippingSchedules = new HashSet<>();
            this.shippingSchedules.remove(getShippingScheduleOrigin());
        }
        this.shippingSchedules.add(shippingScheduleOrigin);
    }

    public void setShippingScheduleDestination(ShippingSchedule shippingScheduleDestination) {
        if (this.shippingSchedules == null) {
            this.shippingSchedules = new HashSet<>();
            this.shippingSchedules.remove(getShippingScheduleDestination());
        }
        this.shippingSchedules.add(shippingScheduleDestination);
    }

    public ShippingSchedule getShippingScheduleDestination() {
        return getShippingByScheduleType(ScheduleType.Destiny);
    }

    private ShippingSchedule getShippingByScheduleType(ScheduleType scheduleType) {
        return this.shippingSchedules.stream()
                .filter(shi -> shi.getScheduleType() == scheduleType)
                .findFirst().orElse(null);
    }

    public String getAdditionalCode() {
        return additionalCode;
    }

    public void setAdditionalCode(String additionalCode) {
        this.additionalCode = additionalCode;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getSignatureImage() {
        return signatureImage;
    }

    public void setSignatureImage(String signatureImage) {
        this.signatureImage = signatureImage;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }


    public Set<LogStatusPackage> getLogStatusPackages() {
        return logStatusPackages;
    }

    public void setLogStatusPackages(Set<LogStatusPackage> logStatusPackages) {
        this.logStatusPackages = logStatusPackages;
    }

    public void updatePackageCommon(PackageDto packageDto) {

        this.setReason(packageDto.getReason());

        if (!StringUtils.isEmpty(packageDto.getSignatureFileName()) && !StringUtils.isEmpty(packageDto.getSignatureImage()))
            this.setSignatureImage(packageDto.getSignatureImage());

//        this.setAvatar(packageDto.getAvatar());
        this.setCaption(packageDto.getCaption());
        this.setPackageSize(packageDto.getPackageSize());
        this.setDetail(packageDto.getDetail());
        this.setExternalCode(packageDto.getExternalCode());
    }

    public void updateShippingSchedule(ShippingScheduleDto shippingScheduleDto, ScheduleType scheduleType) {

        ShippingSchedule shippingSchedule = getShippingByScheduleType(scheduleType);
        shippingSchedule.setDestinationAclaration(shippingScheduleDto.getAclaration());
        shippingSchedule.setDestinationDocNumber(shippingScheduleDto.getDocNumber());
        shippingSchedule.setName(shippingScheduleDto.getName());
        shippingSchedule.setComment(shippingScheduleDto.getComment());

        if (shippingScheduleDto.getScheduledDate() != null) {
            shippingSchedule.setScheduledDate(shippingScheduleDto.getScheduledDate());
            shippingSchedule.setScheduledHour(String.valueOf((shippingScheduleDto.getScheduledDate().getHour())));
        }

        shippingSchedule.updateShippingAddress(shippingScheduleDto);

        if (scheduleType == ScheduleType.Origin) {
            setShippingScheduleOrigin(shippingSchedule);
        } else {
            setShippingScheduleDestination(shippingSchedule);
        }
    }

    public boolean hasOwner() {
        return this.ownerID != null && this.ownerType != null;
    }

    public void updatePaquerAssign(Paquer paquer) {
        this.getShippingScheduleDestination().updatePaquerAssign(paquer);
        this.getShippingScheduleOrigin().updatePaquerAssign(paquer);
    }

    public LocalDateTime getArrivedAtPaqueryPointDate() {
        return arrivedAtPaqueryPointDate;
    }

    public void setArrivedAtPaqueryPointDate(LocalDateTime arrivedAtPaqueryPointDate) {
        this.arrivedAtPaqueryPointDate = arrivedAtPaqueryPointDate;
    }

    public String getRollContainerPosition() {
        return rollContainerPosition;
    }

    public void setRollContainerPosition(String rollContainerPosition) {
        this.rollContainerPosition = rollContainerPosition;
    }

    public Boolean getRollContainerStatus() {
        return rollContainerStatus;
    }

    public void setRollContainerStatus(Boolean rollContainerStatus) {
        this.rollContainerStatus = rollContainerStatus;
    }
}
