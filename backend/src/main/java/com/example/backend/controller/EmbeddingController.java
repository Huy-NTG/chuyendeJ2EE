package com.example.backend.controller;

import com.example.backend.dto.request.SearchRequestBody;
import com.example.backend.dto.response.SearchResult;
import com.example.backend.service.EmbeddingService;
import com.example.backend.service.QdrantCloudService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/embedding")
public class EmbeddingController {

    private final EmbeddingService embeddingService;
    private final QdrantCloudService qdrantService;

    public EmbeddingController(EmbeddingService embeddingService, QdrantCloudService qdrantService) {
        this.embeddingService = embeddingService;
        this.qdrantService = qdrantService;
    }

    @PostMapping("/log")
    public String embedAndSave(@RequestParam String text) {
        // 1. Lấy embedding từ Vertex AI
        float[] vector = embeddingService.embedAndLog(text);
        return text +"embedding ";
    }

    public static class SearchRequest {
        private String collectionName;
        private String queryText;
        private int topK;

        public String getCollectionName() { return collectionName; }
        public void setCollectionName(String collectionName) { this.collectionName = collectionName; }

        public String getQueryText() { return queryText; }
        public void setQueryText(String queryText) { this.queryText = queryText; }

        public int getTopK() { return topK; }
        public void setTopK(int topK) { this.topK = topK; }
    }

    @PostMapping("/search")
    public List<SearchResult> searchSimilar(@RequestBody SearchRequestBody requestBody) {
        return qdrantService.searchSimilarText(
                requestBody.collectionName,
                requestBody.queryText,
                requestBody.topK
        );
    }
}
