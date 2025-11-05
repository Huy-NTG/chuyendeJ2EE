package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;
import com.example.backend.dto.response.SearchResult;

@Service
public class DeepSeekService {
    private final WebClient webClient;

    public DeepSeekService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://openrouter.ai/api/v1/chat/completions")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer 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")
                .defaultHeader("HTTP-Referer", "http://localhost:8080")
                .defaultHeader("X-Title", "Spring Boot DeepSeek Integration")
                .build();
    }

    public String askDeepSeek(String prompt) {
        Map<String, Object> body = Map.of(
                "model", "deepseek/deepseek-chat",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        try {
            Map<String, Object> response = webClient.post()
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                return (String) message.get("content");
            }

            return "Không có phản hồi từ DeepSeek.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi gọi API: " + e.getMessage();
        }
    }

    public String answerQuestion(String question, List<SearchResult> context) {
        // 1. Kết hợp context thành một chuỗi
        StringBuilder contextText = new StringBuilder();
        for (SearchResult result : context) {
            contextText.append(result.getText()).append("\n");
        }

        // 2. Tạo prompt gửi DeepSeek
        String prompt = "Dựa trên thông tin sau:\n" + contextText +
                "\nHãy trả lời câu hỏi: " + question;

        // 3. Gọi API DeepSeek
        Map<String, Object> body = Map.of(
                "model", "deepseek/deepseek-chat",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );

        try {
            Map<String, Object> response = webClient.post()
                    .uri("/chat/completions")
                    .bodyValue(body)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                return (String) message.get("content");
            }

            return "Không có phản hồi từ DeepSeek.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Lỗi khi gọi API: " + e.getMessage();
        }
    }
}
