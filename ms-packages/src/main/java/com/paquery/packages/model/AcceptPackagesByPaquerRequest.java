package com.paquery.packages.model;

import javax.validation.constraints.NotNull;
import java.util.List;

public class AcceptPackagesByPaquerRequest {

    @NotNull
    private List<Long> packagesID;

    @NotNull
    private Long paquerID;

    public Long getPaquerID() {
        return paquerID;
    }

    public void setPaquerID(Long paquerID) {
        this.paquerID = paquerID;
    }

    public List<Long> getPackagesID() {
        return packagesID;
    }

    public void setPackagesID(List<Long> packagesID) {
        this.packagesID = packagesID;
    }
}
