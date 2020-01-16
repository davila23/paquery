package com.paquery.packages.domain;

import com.paquery.commons.enums.PackageStatus;
import com.paquery.commons.utils.DateUtils;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

import static java.lang.String.format;

@Entity
@Table(name = "PQ_ChangeStatusLog")
public class LogStatusPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PackageID")
    private PaqueryPackage paqueryPackage;

    @Column(name = "PreviusStatus")
    private Integer previusStatus;

    @Column(name = "NextStatus")
    private Integer nextStatus;

    @Column(name = "CreationDate")
    private LocalDateTime creationDate;

    @Column(name = "UserID")
    private Long userID;

    @Column(name = "UserEmail")
    private String userEmail;

    public LogStatusPackage(PaqueryPackage pqPackage, PackageStatus previusStatus, PackageStatus nextStatus, Long userID, String userEmail) {
        this.paqueryPackage = pqPackage;
        this.previusStatus = previusStatus.getValue();
        this.nextStatus = nextStatus.getValue();
        this.creationDate = DateUtils.nowLocalDateTime();
        this.userID = userID;
        this.userEmail = userEmail;
    }

    public LogStatusPackage() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaqueryPackage getPaqueryPackage() {
        return paqueryPackage;
    }

    public void setPaqueryPackage(PaqueryPackage paqueryPackage) {
        this.paqueryPackage = paqueryPackage;
    }

    public PackageStatus getPreviusStatus() {
        return PackageStatus.valueOf(previusStatus);
    }

    public void setPreviusStatus(PackageStatus previusStatus) {
        this.previusStatus = previusStatus.getValue();
    }

    public void setNextStatus(PackageStatus nextStatus) {
        this.nextStatus = nextStatus.getValue();
    }

    public PackageStatus getNextStatus() {
        return PackageStatus.valueOf(nextStatus);
    }

    public void setNextStatus(Integer nextStatus) {
        this.nextStatus = nextStatus;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String resolveMessage() {
        return format("Se paso de estado %s a estado %s, usuario: %s", getPreviusStatus(), getNextStatus(), this.userEmail);
    }
}
