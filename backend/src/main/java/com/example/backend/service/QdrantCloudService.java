//package com.example.backend.service;
//
//import io.qdrant.client.QdrantClient;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import com.example.backend.service.EmbeddingService;
//import com.example.backend.dto.response.SearchResult;
//
//
//import java.util.*;
//
//@Service
//public class QdrantCloudService {
//
//    @Value("${spring.ai.qdrant.client.url}")
//    private String QDRANT_URL;
//
//    @Value("${spring.ai.qdrant.client.key}")
//    private String API_KEY ;
//
//    private final RestTemplate restTemplate;
//    private final QdrantClient qdrantClient;
//    private final EmbeddingService embe;
//    public QdrantCloudService(RestTemplate restTemplate, QdrantClient qdrantClient, EmbeddingService embeddingService) {
//        this.restTemplate = restTemplate;
//        this.qdrantClient = qdrantClient;
//        this.embe=embeddingService;
//    }
//
//    public void saveVector(String collectionName, String pointId, List<Float> vector, Map<String, Object> payload) {
//        // Đảm bảo collection tồn tại
//        createCollectionIfNotExists(collectionName);
//
//        Map<String, Object> requestBody = new HashMap<>();
//        List<Map<String, Object>> points = new ArrayList<>();
//
//        Map<String, Object> point = new HashMap<>();
//        point.put("id", pointId);
//        point.put("vector", vector);
//        point.put("payload", payload);
//        points.add(point);
//        requestBody.put("points", points);
//
//        // Gọi API Qdrant
//        String url = String.format("%s/collections/%s/points?wait=true", QDRANT_URL, collectionName);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.set("api-key", API_KEY);
//
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//
//        try {
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
//            if (response.getStatusCode() == HttpStatus.OK) {
//                System.out.println("✅ Vector saved successfully with ID: " + pointId);
//            } else {
//                System.out.println("❌ Failed to save vector. Response: " + response.getBody());
//            }
//        } catch (Exception e) {
//            System.err.println("⚠️ Error while saving vector: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//    private void createCollectionIfNotExists(String collectionName) {
//        // Kiểm tra collection đã tồn tại chưa
//        String url = String.format("%s/collections/%s", QDRANT_URL, collectionName);
//        HttpHeaders headers = new HttpHeaders();
//        headers.set("api-key", API_KEY);
//        HttpEntity<String> entity = new HttpEntity<>(headers);
//
//        try {
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
//            if (response.getStatusCode() == HttpStatus.OK) {
//                System.out.println("Collection already exists: " + collectionName);
//                return;
//            }
//        } catch (Exception e) {
//            // Collection không tồn tại, tạo mới
//        }
//
//        // Tạo collection mới
//        url = String.format("%s/collections/%s", QDRANT_URL, collectionName);
//        Map<String, Object> requestBody = new HashMap<>();
//        Map<String, Object> vectorsConfig = new HashMap<>();
//        vectorsConfig.put("size", 768);
//        vectorsConfig.put("distance", "Cosine");
//        requestBody.put("vectors", vectorsConfig);
//
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//        try {
//            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
//            if (response.getStatusCode() == HttpStatus.OK) {
//                System.out.println("✅ Collection created: " + collectionName);
//            } else {
//                System.out.println("Failed to create collection. Response: " + response.getBody());
//            }
//        } catch (Exception e) {
//            System.err.println("Error while creating collection: " + e.getMessage());
//            e.printStackTrace();
//        }
//    }
//
//    public List<SearchResult> searchSimilarText(String collectionName, String queryText, int topK) {
//        float[] queryVector = embe.embedAndLog(queryText);
//
//        Map<String, Object> payload = Map.of(
//                "vector", queryVector,
//                "top", topK,
//                "with_payload", true,
//                "with_vector", false
//        );
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        headers.setBearerAuth(API_KEY);
//
//        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);
//
//        try {
//            ResponseEntity<Map> response = restTemplate.postForEntity(
//                    QDRANT_URL + "/collections/" + collectionName + "/points/search",
//                    request,
//                    Map.class
//            );
//
//            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
//                List<Map<String, Object>> resultPoints = (List<Map<String, Object>>) response.getBody().get("result");
//
//                List<SearchResult> results = new ArrayList<>();
//                for (Map<String, Object> point : resultPoints) {
//                    String id = point.get("id").toString();
//                    float score = Float.parseFloat(point.get("score").toString());
//                    String text = (String)((Map)point.get("payload")).get("text");
//
//                    results.add(new SearchResult(id, score, text));
//                }
//                return results;
//
//            } else {
//                System.err.println("No results or error: " + response.getStatusCode());
//                return List.of();
//            }
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return List.of();
//        }
//    }
//
//}
package com.example.backend.service;

import com.example.backend.dto.response.TourResponse;
import io.qdrant.client.QdrantClient;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.example.backend.service.EmbeddingService;
import com.example.backend.dto.response.SearchResult;


import javax.swing.*;
import java.util.*;

@Service
public class QdrantCloudService {

    @Value("${spring.ai.qdrant.client.url}")
    private String QDRANT_URL;

    @Value("${spring.ai.qdrant.client.key}")
    private String API_KEY ;

    private final RestTemplate restTemplate;
    private final EmbeddingService embe;
    private final TourService tourService;

    public QdrantCloudService(RestTemplate restTemplate, EmbeddingService embe, TourService tourService){
        this.restTemplate=restTemplate;
        this.embe=embe;
        this.tourService=tourService;
    }
    public String buildTourResponse(TourResponse tour) {
        String baseUrl = "http://localhost:3000/tour/"; // hoặc domain thật của bạn
        return String.format(
                "Có một tour du lịch khám phá đảo %s:\n" +
                        "- Địa điểm: %s\n" +
                        "- Mô tả: %s\n" +
                        "- Giá: %,.0f VND\n" +
                        "- Thời gian: %s đến %s\n" +
                        "👉 [Xem chi tiết tour](%s%d)",
                tour.getName(),
                tour.getLocation(),
                tour.getDescription(),
                tour.getPrice(),
                tour.getStartDate(),
                tour.getEndDate(),
                baseUrl,
                tour.getId()
        );
    }

    public void saveVector(String collectionName, String pointId, List<Float> vector, Map<String, Object> payload) {
        // Đảm bảo collection tồn tại
        createCollectionIfNotExists(collectionName);

        Map<String, Object> requestBody = new HashMap<>();
        List<Map<String, Object>> points = new ArrayList<>();

        Map<String, Object> point = new HashMap<>();
        point.put("id", pointId);
        point.put("vector", vector);
        point.put("payload", payload);
        points.add(point);
        requestBody.put("points", points);

        // Gọi API Qdrant
        String url = String.format("%s/collections/%s/points?wait=true", QDRANT_URL, collectionName);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", API_KEY);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("✅ Vector saved successfully with ID: " + pointId);
            } else {
                System.out.println("❌ Failed to save vector. Response: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("⚠️ Error while saving vector: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private void createCollectionIfNotExists(String collectionName) {
        // Kiểm tra collection đã tồn tại chưa
        String url = String.format("%s/collections/%s", QDRANT_URL, collectionName);
        HttpHeaders headers = new HttpHeaders();
        headers.set("api-key", API_KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("Collection already exists: " + collectionName);
                return;
            }
        } catch (Exception e) {
            // Collection không tồn tại, tạo mới
        }

        // Tạo collection mới
        url = String.format("%s/collections/%s", QDRANT_URL, collectionName);
        Map<String, Object> requestBody = new HashMap<>();
        Map<String, Object> vectorsConfig = new HashMap<>();
        vectorsConfig.put("size", 768);
        vectorsConfig.put("distance", "Cosine");
        requestBody.put("vectors", vectorsConfig);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.PUT, request, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println("✅ Collection created: " + collectionName);
            } else {
                System.out.println("Failed to create collection. Response: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("Error while creating collection: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public List<SearchResult> searchSimilarText(String collectionName, String queryText, int topK) {
        float[] queryVector = embe.embedAndLog(queryText);

        Map<String, Object> payload = Map.of(
                "vector", queryVector,
                "top", topK,
                "with_payload", true,
                "with_vector", false
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(API_KEY);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                    QDRANT_URL + "/collections/" + collectionName + "/points/search",
                    request,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Map<String, Object>> resultPoints = (List<Map<String, Object>>) response.getBody().get("result");

                List<SearchResult> results = new ArrayList<>();
                for (Map<String, Object> point : resultPoints) {
                    String id = point.get("id").toString();
                    float score = Float.parseFloat(point.get("score").toString());
                    Object idObj = ((Map<?, ?>) point.get("payload")).get("id");
                    String tourId = String.valueOf(idObj);
                    TourResponse text = tourService.getTourById(Long.parseLong(tourId));


                    results.add(new SearchResult(id, score, tourId, text));
                }
                return results;

            } else {
                System.err.println("No results or error: " + response.getStatusCode());
                return List.of();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

}