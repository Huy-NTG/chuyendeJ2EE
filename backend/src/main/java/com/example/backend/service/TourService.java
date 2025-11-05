package com.example.backend.service;

import com.example.backend.dto.request.TourRequest;
import com.example.backend.dto.response.TourResponse;

import com.example.backend.entity.Tours;
import com.example.backend.mapper.TourMapper;
import com.example.backend.repository.TourEmbeddingRepository;
import com.example.backend.repository.TourRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository toursRepository;
    private final TourMapper toursMapper;
//    private final EmbeddingService embeddingService;
    private final TourEmbeddingRepository embeddingRepository;


    // Tạo tour mới
    public TourResponse createTour(TourRequest request) {
        try {
            Tours tour = toursMapper.toEntity(request);
            tour = toursRepository.save(tour);
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
    // Đếm tổng số tour
    public long countTours() {
        return toursRepository.count();
    }
}
