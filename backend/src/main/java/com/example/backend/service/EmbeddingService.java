package com.example.backend.service;

import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingModel;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingOptions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmbeddingService {

    private final VertexAiTextEmbeddingModel embeddingModel;

    public EmbeddingService(VertexAiTextEmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
    }

    public float[] embedAndLog(String text) {
        VertexAiTextEmbeddingOptions options = VertexAiTextEmbeddingOptions.builder()
                .model("text-embedding-005")
                .build();

        EmbeddingRequest request = new EmbeddingRequest(List.of(text), options);
        EmbeddingResponse response = embeddingModel.call(request);

        float[] vector = response.getResults().get(0).getOutput();

        System.out.println("✅ Kết quả embedding cho văn bản: " + text);
        System.out.println("Vector (length " + vector.length + "): " + java.util.Arrays.toString(vector));

        return vector;
    }
}

