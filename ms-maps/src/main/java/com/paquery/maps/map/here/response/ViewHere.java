package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class ViewHere {

    @JsonProperty(value = "ViewId")
    private long viewId;

    @JsonProperty(value = "_type")
    private String type;

    @JsonProperty(value = "Result")
    private List<ResultHere> result;

    public long getViewId() {
        return viewId;
    }

    public void setViewId(long viewId) {
        this.viewId = viewId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<ResultHere> getResult() {
        return result;
    }

    public void setResult(List<ResultHere> result) {
        this.result = result;
    }

    public PositionHere getFirstNavigationPosition() {
        if (result != null && !result.isEmpty())
            return result.get(0).getFirstNavigationPosition();

        return null;
    }

    public LocationHere getFirstLocation() {
        if (result != null && !result.isEmpty())
            return result.get(0).getLocation();

        return null;
    }
}
