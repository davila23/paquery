package com.paquery.maps.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "PQ_DistributionZone")
public class DistributionZone {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "PostalCode")
    private String postalCode;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @ManyToMany
    @JoinTable(
            name = "PQ_ZoneToDistributionZone",
            joinColumns = { @JoinColumn(name = "DistributionZoneID") },
            inverseJoinColumns = { @JoinColumn(name = "ZoneID") }
    )
    private Set<Zone> zones;

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

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
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

    public Set<Zone> getZones() {
        return zones;
    }

    public void setZones(Set<Zone> zones) {
        this.zones = zones;
    }
}
