package com.paquery.maps.w3w.response;

import java.util.HashMap;

public class W3wResponse {

    private String words;

    private String map;

    private String language;

    private HashMap<String, String> geometry;

    public String getWords() {
        return words;
    }

    public void setWords(String words) {
        this.words = words;
    }

    public String getMap() {
        return map;
    }

    public void setMap(String map) {
        this.map = map;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public HashMap<String, String> getGeometry() {
        return geometry;
    }

    public void setGeometry(HashMap<String, String> geometry) {
        this.geometry = geometry;
    }
}
