package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class SearchRequestBody {
    public String collectionName;
    public String queryText;
    public int topK;
}
