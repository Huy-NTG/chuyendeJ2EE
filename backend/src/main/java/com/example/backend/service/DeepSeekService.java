//package com.example.backend.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import java.util.List;
//import java.util.Map;
//import com.example.backend.dto.response.SearchResult;
//
//@Service
//public class DeepSeekService {
//    private final WebClient webClient;
//
////    @Value("${openrouter.url}")
////    private String url;
////
////    @Value("${openrouter.key}")
////    private String key;
////
////    @Value("${openrouter.localhost}")
////    private String localhost;
//
//
//    public DeepSeekService(
//            WebClient.Builder builder,
//            @Value("${openrouter.url}") String url,
//            @Value("${openrouter.key}") String key,
//            @Value("${openrouter.localhost}") String localhost
//    ) {
//        this.webClient = WebClient.builder()
//                .baseUrl(url)
//                .defaultHeader("Content-Type", "application/json")
//                .defaultHeader("Authorization","Bearer "+ key)
//                .defaultHeader("HTTP-Referer", localhost)
//                .defaultHeader("X-Title", "Spring Boot DeepSeek Integration")
//                .build();
//    }
//
//    public String askDeepSeek(String prompt) {
//        Map<String, Object> body = Map.of(
//                "model", "deepseek/deepseek-chat",
//                "messages", List.of(
//                        Map.of("role", "user", "content", prompt)
//                )
//        );
//
//        try {
//            Map<String, Object> response = webClient.post()
//                    .bodyValue(body)
//                    .retrieve()
//                    .bodyToMono(Map.class)
//                    .block();
//
//            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
//            if (choices != null && !choices.isEmpty()) {
//                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
//                return (String) message.get("content");
//            }
//
//            return "Không có phản hồi từ DeepSeek.";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Lỗi khi gọi API: " + e.getMessage();
//        }
//    }
//
//    public String answerQuestion(String question, List<SearchResult> context) {
//        // 1. Kết hợp context thành một chuỗi
//        StringBuilder contextText = new StringBuilder();
//        for (SearchResult result : context) {
//            contextText.append(result.getText()).append("\n");
//        }
//
//        // 2. Tạo prompt gửi DeepSeek
//        String prompt = "Dựa trên thông tin sau:\n" + contextText +
//                "\nHãy trả lời câu hỏi: " + question;
//
//        // 3. Gọi API DeepSeek
//        Map<String, Object> body = Map.of(
//                "model", "deepseek/deepseek-chat",
//                "messages", List.of(
//                        Map.of("role", "user", "content", prompt)
//                )
//        );
//
//        try {
//            Map<String, Object> response = webClient.post()
//                    .uri("/chat/completions")
//                    .bodyValue(body)
//                    .retrieve()
//                    .bodyToMono(Map.class)
//                    .block();
//
//            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
//            if (choices != null && !choices.isEmpty()) {
//                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
//                return (String) message.get("content");
//            }
//
//            return "Không có phản hồi từ DeepSeek.";
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Lỗi khi gọi API: " + e.getMessage();
//        }
//    }
//}
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
            WebClient.Builder builder,
            @Value("${openrouter.url}") String url,
            @Value("${openrouter.key}") String key,
            @Value("${openrouter.localhost}") String localhost
    ) {
        this.webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Authorization","Bearer "+ key)
                .defaultHeader("HTTP-Referer", localhost)
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
            contextText.append("Tên tour: ").append(result.getTour().getName()).append("\n")
                    .append("Địa điểm: ").append(result.getTour().getLocationText()).append("\n")
                    .append("Mô tả: ").append(result.getTour().getDescription()).append("\n")
                    .append("Hình ảnh: ").append(result.getTour().getImageUrl()).append("\n")
                    .append("Giá: ").append(result.getTour().getPrice()).append(" VND\n")
                    .append("Thời gian: ").append(result.getTour().getStartDate())
                    .append(" đến ").append(result.getTour().getEndDate()).append("\n")
                    .append("Số chỗ: ").append(result.getTour().getSeats()).append("\n")
                    .append("Ngày tạo: ").append(result.getTour().getCreatedAt()).append("\n");
        }

        StringBuilder Text = new StringBuilder();
        for (SearchResult result : context) {
            contextText.append("Tour: ").append(result.getTour().getName())
                    .append(" tại ").append(result.getTour().getLocationText())
                    .append("\n");
        }

        // 2. Tạo prompt gửi DeepSeek
        String prompt = "Dựa trên danh sách tour sau:\n" + Text +
                "\nHãy trả lời câu hỏi: \"" + question + "\". Chỉ trả lời tóm tắt, " +
                "không lặp lại chi tiết thông tin tour, chỉ cho biết có tour liên quan hay không, " +
                "và gợi ý tour nếu cần.";

        // 3. Gọi API DeepSeek
        Map<String, Object> body = Map.of(
                "model", "deepseek/deepseek-chat",
                "messages", List.of(
                        Map.of("role", "user", "content", prompt)
                )
        );
//.uri("/chat/completions")
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
}
