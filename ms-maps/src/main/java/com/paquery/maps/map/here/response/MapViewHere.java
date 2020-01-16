package com.paquery.maps.map.here.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class MapViewHere {

    @JsonProperty(value = "TopLeft")
    private PositionHere topLeft;

    @JsonProperty(value = "BottomRight")
    private PositionHere bottomRight;

    public PositionHere getTopLeft() {
        return topLeft;
    }

    public void setTopLeft(PositionHere topLeft) {
        this.topLeft = topLeft;
    }

    public PositionHere getBottomRight() {
        return bottomRight;
    }

    public void setBottomRight(PositionHere bottomRight) {
        this.bottomRight = bottomRight;
    }
}
