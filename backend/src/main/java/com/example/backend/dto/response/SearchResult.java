package com.example.backend.dto.response;


import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@Setter
public class SearchResult {
    public String id;
    public float score;
    public String text;

    public SearchResult(String id, float score, String text) {
        this.id = id;
        this.score = score;
        this.text = text;
    }
}
