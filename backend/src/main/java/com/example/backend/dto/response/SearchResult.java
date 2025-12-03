//package com.example.backend.dto.response;
//
//
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.stereotype.Service;
//
//@Getter
//@Setter
//public class SearchResult {
//    public String id;
//    public float score;
//    public String text;
//
//    public SearchResult(String id, float score, String text) {
//        this.id = id;
//        this.score = score;
//        this.text = text;
//    }
//}
package com.example.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult {
    private String id;
    private double score;
    private String tourId;
    private TourResponse tour;
}
