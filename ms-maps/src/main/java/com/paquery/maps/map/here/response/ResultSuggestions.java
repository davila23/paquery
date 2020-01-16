package com.paquery.maps.map.here.response;

import java.util.List;

public class ResultSuggestions {
    private List<Suggestions> suggestions;

    public List<Suggestions> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<Suggestions> suggestions) {
        this.suggestions = suggestions;
    }
}
