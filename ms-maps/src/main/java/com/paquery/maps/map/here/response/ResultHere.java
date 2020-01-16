package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResultHere {

    @JsonProperty(value = "MatchQuality")
    private MatchQualityHere matchQuality;

    @JsonProperty(value = "MatchLevel")
    private String matchLevel;

    @JsonProperty(value = "Relevance")
    private Long relevance;

    @JsonProperty(value = "MatchType")
    private String matchType;

    @JsonProperty(value = "Location")
    private LocationHere location;

    public MatchQualityHere getMatchQuality() {
        return matchQuality;
    }

    public void setMatchQuality(MatchQualityHere matchQuality) {
        this.matchQuality = matchQuality;
    }

    public String getMatchLevel() {
        return matchLevel;
    }

    public void setMatchLevel(String matchLevel) {
        this.matchLevel = matchLevel;
    }

    public Long getRelevance() {
        return relevance;
    }

    public void setRelevance(Long relevance) {
        this.relevance = relevance;
    }

    public String getMatchType() {
        return matchType;
    }

    public void setMatchType(String matchType) {
        this.matchType = matchType;
    }

    public LocationHere getLocation() {
        return location;
    }

    public void setLocation(LocationHere location) {
        this.location = location;
    }

    public PositionHere getFirstNavigationPosition() {
        if (location != null)
            return location.getFirstNavigationPosition();
        return null;
    }
}
