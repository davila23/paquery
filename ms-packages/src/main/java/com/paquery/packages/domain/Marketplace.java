package com.paquery.packages.domain;

import javax.persistence.*;

@Entity
@Table(name = "PQ_Marketplace")
public class Marketplace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Detail")
    private String detail;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "Published")
    private Boolean published;

    @Column(name = "SendCustomerNotifications")
    private Boolean sendCustomerNotifications;

    @Column(name = "Stock")
    private Boolean stock;

    public Marketplace() {
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

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
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

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Boolean getSendCustomerNotifications() {
        return sendCustomerNotifications;
    }

    public void setSendCustomerNotifications(Boolean sendCustomerNotifications) {
        this.sendCustomerNotifications = sendCustomerNotifications;
    }

    public Boolean getStock() {
        return stock;
    }

    public void setStock(Boolean stock) {
        this.stock = stock;
    }
}
