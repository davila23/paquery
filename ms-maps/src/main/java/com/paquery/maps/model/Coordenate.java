package com.paquery.maps.model;

public class Coordenate {
    private double latitude;
    private double longitude;

    public Coordenate(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Coordenate() {
    }

    public Double calculateDistance(Coordenate coordenate) {
        double x = this.latitude - coordenate.latitude;
        double y = this.longitude - coordenate.longitude;
        return x * x + y * y;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString(){
        return String.format("{ lat: %.7f, lng: %.7f }", latitude, longitude);
    }
}
