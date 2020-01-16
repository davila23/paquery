package com.paquery.maps.domain.relations;

import com.paquery.maps.domain.DistributionZone;
import com.paquery.maps.domain.Zone;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "PQ_ZoneToDistributionZone")
public class ZoneToDistributionZone {

    @Id
    @Column(name = "ID")
    private Long id;

    private Boolean active;
    private Boolean deleted;

    @OneToOne
    @JoinColumn(name = "ZoneID")
    private Zone zone;

    @OneToOne
    @JoinColumn(name = "DistributionZoneID")
    private DistributionZone distributionZone;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Zone getZone() {
        return zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public DistributionZone getDistributionZone() {
        return distributionZone;
    }

    public void setDistributionZone(DistributionZone distributionZone) {
        this.distributionZone = distributionZone;
    }

    public static Set<DistributionZone> getDistributionZoneActives(Set<ZoneToDistributionZone> distributionZoneRelations) {
        return distributionZoneRelations
                .stream()
                .filter((rel) -> rel.getActive() && !rel.getDeleted())
                .map((rel) -> rel.getDistributionZone())
                .collect(Collectors.toSet());
    }
}
