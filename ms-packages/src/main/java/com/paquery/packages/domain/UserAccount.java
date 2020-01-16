package com.paquery.packages.domain;

import com.paquery.commons.utils.DateUtils;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "PQ_UserAccount")
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Amount")
    private BigDecimal amount;

    @Column(name = "SpentMoney")
    private BigDecimal spentMoney;

    @Column(name = "LockedAmount")
    private BigDecimal lockedAmount;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "UserID")
    private Long user;

    @Column(name = "ModificationDate")
    private LocalDateTime modificationDate;


    public UserAccount() {
    }

    public UserAccount(Long user) {
        this.active = true;
        this.deleted = false;
        this.user = user;
        this.modificationDate = DateUtils.nowLocalDateTime();
        this.spentMoney = new BigDecimal(0);
        this.amount = new BigDecimal(0);
        this.lockedAmount = new BigDecimal(0);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public BigDecimal getSpentMoney() {
        return spentMoney;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getLockedAmount() {
        return lockedAmount;
    }

    public void setLockedAmount(BigDecimal lockedAmount) {
        this.lockedAmount = lockedAmount;
    }

    public void setSpentMoney(BigDecimal spentMoney) {
        this.spentMoney = spentMoney;
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

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public LocalDateTime getModificationDate() {
        return modificationDate;
    }

    public void setModificationDate(LocalDateTime modificationDate) {
        this.modificationDate = modificationDate;
    }
}
