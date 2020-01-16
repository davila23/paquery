package com.paquery.maps.domain;

import com.paquery.maps.domain.relations.ZoneToDistributionZone;
import com.paquery.maps.map.here.response.PositionHere;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "PQ_Zone")
public class Zone {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Name")
    private String name;

    @Column(name = "Code")
    private String code;

    @Column(name = "Detail")
    private String detail;

    @Column(name = "Active")
    private Boolean active;

    @Column(name = "Deleted")
    private Boolean deleted;

    @Column(name = "Geometry")
    private String geometry;

//    @ManyToMany
//    @JoinTable(name = "PQ_ZoneToDistributionZone",
//            joinColumns = @JoinColumn(name = "ZoneID", referencedColumnName = "ID"),
//            inverseJoinColumns = @JoinColumn(name = "DistributionZoneID", referencedColumnName = "ID")
//    )
//    private DistributionZone distributionZone;

//    @OneToMany(mappedBy = "ZoneID")
//    private Set<ZoneToDistributionZone> distributionZoneRelations;


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

    public String getGeometry() {
        return geometry;
    }

    public void setGeometry(String geometry) {
        this.geometry = geometry;
    }

}
