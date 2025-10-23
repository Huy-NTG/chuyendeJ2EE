package com.example.backend.service;


import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.Em;
import com.google.cloud.vertexai.generativeai.TextEmbeddingModel;
import com.google.cloud.vertexai.api.*;
import com.google.cloud.vertexai.generativeai.*;
import org.springframework.stereotype.Service;

@Service
public class EmbeddingService {

    public void createEmbedding() throws Exception {
        try (VertexAI vertexAI = new VertexAI("your-project-id", "us-central1")) {
            TextEmbeddingModel model = TextEmbeddingModel.fromPretrained("text-embedding-004", vertexAI);
            EmbeddingResponse response = model.embed("Xin chào thế giới!");
            System.out.println(response.getEmbeddingsList());
        }
    }
}
