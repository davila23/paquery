package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ResponseHere {

    @JsonProperty("MetaInfo")
    private MetaInfoHere metaInfo;

    @JsonProperty("View")
    private List<ViewHere> view;

    public MetaInfoHere getMetaInfo() {
        return metaInfo;
    }

    public void setMetaInfo(MetaInfoHere metaInfo) {
        this.metaInfo = metaInfo;
    }

    public List<ViewHere> getView() {
        return view;
    }

    public void setView(List<ViewHere> view) {
        this.view = view;
    }

    public PositionHere getFirstNavigationPosition() {
        LocationHere firstLocation = getFirstLocation();

        if (firstLocation == null)
            return null;

        return firstLocation.getFirstNavigationPosition();
    }

    public LocationHere getFirstLocation() {
        if (view != null && !view.isEmpty()) {
            return view.get(0).getFirstLocation();
        }

        return null;
    }
}
