package com.example.backend.controller;

import com.example.backend.dto.request.ChatRequest;
import com.example.backend.dto.request.SearchRequestBody;
import com.example.backend.dto.response.ChatResponse;
import com.example.backend.dto.response.SearchResult;
import com.example.backend.service.DeepSeekService;
import com.example.backend.service.EmbeddingService;
import com.example.backend.service.QdrantCloudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
public class DeepSeekController {

    @Autowired
    private DeepSeekService deepSeekService;
    private final QdrantCloudService qdrantService;
    private final EmbeddingService embeddingService;

    @PostMapping("/ask")
    public String chat(@RequestBody ChatRequest request) {
        return deepSeekService.askDeepSeek(request.getPrompt());
    }

    public DeepSeekController(DeepSeekService deepSeekService, QdrantCloudService qdrantService,
                              EmbeddingService embeddingService) {
        this.deepSeekService = deepSeekService;
        this.qdrantService = qdrantService;
        this.embeddingService = embeddingService;
    }

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody SearchRequestBody request) {
        // 1. Tìm kiếm các đoạn tương tự
        List<SearchResult> context = qdrantService.searchSimilarText(
                request.collectionName,
                request.queryText,
                request.topK
        );

        // 2. Gọi DeepSeek để trả lời dựa trên context
        String answer = deepSeekService.answerQuestion(request.queryText, context);

        // 3. Trả về kết quả
        ChatResponse response = new ChatResponse();
        response.answer = answer;
        response.context = context;
        return response;
    }
}
