package com.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.List;
import java.util.Map;
import com.example.backend.dto.response.SearchResult;

@Service
public class DeepSeekService {
    private final WebClient webClient;

    public DeepSeekService(
            @Value("${openrouter.url}") String baseUrl,
            @Value("${openrouter.key}") String apiKey,
            @Value("${openrouter.referer}") String referer,
            @Value("${openrouter.title}") String title
    ) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("HTTP-Referer", referer)
                .defaultHeader("X-Title", title)
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
