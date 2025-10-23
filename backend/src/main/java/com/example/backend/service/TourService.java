package com.example.backend.service;

import com.example.backend.dto.request.TourRequest;
import com.example.backend.dto.response.TourResponse;
import com.example.backend.entity.TourEmbedding;
import com.example.backend.entity.Tours;
import com.example.backend.mapper.TourMapper;
import com.example.backend.repository.TourEmbeddingRepository;
import com.example.backend.repository.TourRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository toursRepository;
    private final TourMapper toursMapper;
//    private final EmbeddingService embeddingService;
    private final TourEmbeddingRepository embeddingRepository;


    public TourResponse recommend(String query) throws IOException {
//        List<Double> queryEmbed = embeddingService.generateEmbedding(query);

        List<TourEmbedding> all = embeddingRepository.findAll();
        double bestScore = -1;
        Tours bestTour = null;

        for (TourEmbedding e : all) {
            List<Double> tourVec = new Gson().fromJson(e.getEmbedding(),
                    new TypeToken<List<Double>>() {}.getType());
            double score = embeddingService.cosineSimilarity(queryEmbed, tourVec);
            if (score > bestScore) {
                bestScore = score;
                bestTour = e.getTour();
            }
        }
        return toursMapper.toResponse(bestTour);
    }
    // Tạo tour mới
    public TourResponse createTour(TourRequest request) {
        try {
            Tours tour = toursMapper.toEntity(request);
            tour = toursRepository.save(tour);
            List<Double> embedding = embeddingService.generateEmbedding(tour.getDescription());
            TourEmbedding e = new TourEmbedding();
            e.setTour(tour);
            e.setEmbedding(new Gson().toJson(embedding));
            embeddingRepository.save(e);
            return toursMapper.toResponse(tour);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            throw new RuntimeException(ex.getMessage());
        }
    }

    // Cập nhật tour
    public TourResponse updateTour(Long id, TourRequest request) {
        Tours tour = toursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        toursMapper.updateEntity(tour, request);
        tour = toursRepository.save(tour);
        return toursMapper.toResponse(tour);
    }

    // Lấy tour theo ID
    public TourResponse getTourById(Long id) {
        Tours tour = toursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        return toursMapper.toResponse(tour);
    }

    // Lấy tất cả tour
    public List<TourResponse> getAllTours() {
        return toursRepository.findAll().stream()
                .map(toursMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Xóa tour
    public void deleteTour(Long id) {
        if (!toursRepository.existsById(id)) {
            throw new RuntimeException("Tour not found");
        }
        toursRepository.deleteById(id);
    }

    // Tìm kiếm tour theo tên (ignore case)
    public List<TourResponse> searchToursByName(String name) {
        return toursRepository.findByNameContainingIgnoreCase(name).stream()
                .map(toursMapper::toResponse)
                .collect(Collectors.toList());
    }
}
