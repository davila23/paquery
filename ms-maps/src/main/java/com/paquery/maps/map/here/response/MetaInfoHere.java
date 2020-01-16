package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MetaInfoHere {

    @JsonProperty(value = "NextPageInformation")
    private String nextPageInformation;

    @JsonProperty(value = "Timestamp")
    private String timestamp;

    public String getNextPageInformation() {
        return nextPageInformation;
    }

    public void setNextPageInformation(String nextPageInformation) {
        this.nextPageInformation = nextPageInformation;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
