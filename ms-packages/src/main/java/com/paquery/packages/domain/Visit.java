package com.paquery.packages.domain;

import com.paquery.commons.dto.VisitDto;
import com.paquery.packages.utils.DateUtils;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "PQ_Visit")
public class Visit {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "ShippingScheduleID")
    private ShippingSchedule shippingSchedule;

    @Column(name = "Reason")
    private String reason;

    @Column(name = "Photo")
    private String photo;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "NumberVisit")
    private Integer numberVisit;

    public Visit() {

    }

    public Visit(VisitDto visitDto) {

        this.creationDate = DateUtils.nowLocalDateTime();
        this.photo = visitDto.getPhoto();
        this.reason = visitDto.getReason();
        this.active = true;
        this.deleted = false;
    }

    public void updateVisit(VisitDto visitDto) {
        this.reason = visitDto.getReason();
        if (!StringUtils.isEmpty(visitDto.getPhotoName())) {
            this.setPhoto(visitDto.getPhotoName());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public ShippingSchedule getShippingSchedule() {
        return shippingSchedule;
    }

    public void setShippingSchedule(ShippingSchedule shippingSchedule) {
        this.shippingSchedule = shippingSchedule;
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

    public void setDeleted(Boolean delete) {
        this.deleted = delete;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Integer getNumberVisit() {
        return numberVisit;
    }

    public void setNumberVisit(Integer numberVisit) {
        this.numberVisit = numberVisit;
    }

    public PaqueryPackage getCurrentPackage() {
        return this.shippingSchedule.getPaqueryPackage();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
