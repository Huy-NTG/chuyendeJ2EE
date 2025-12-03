package com.example.backend.config;

import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingModel;
import org.springframework.ai.vertexai.embedding.text.VertexAiTextEmbeddingOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ai.vertexai.embedding.VertexAiEmbeddingConnectionDetails;

@Configuration
public class VertexAIConfig {

    @Value("${spring.ai.vertex.project-id}")
    private String projectId;

    @Value("${spring.ai.vertex.location}")
    private String location;

    @Value("${spring.ai.vertex.embedding.model}")
    private String model;

    @Bean
    public VertexAiTextEmbeddingModel vertexAiTextEmbeddingModel() {
        // Cấu hình thông tin kết nối Vertex AI
        VertexAiEmbeddingConnectionDetails connectionDetails =
                VertexAiEmbeddingConnectionDetails.builder()
                        .projectId(projectId)
                        .location(location)
                        .build();

        // Tùy chọn model embedding
        VertexAiTextEmbeddingOptions options =
                VertexAiTextEmbeddingOptions.builder()
                        .model(model) // ví dụ: text-embedding-005
                        .build();

        // Tạo model embedding
        return new VertexAiTextEmbeddingModel(connectionDetails, options);
    }
}
