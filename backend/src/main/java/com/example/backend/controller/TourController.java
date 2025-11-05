package com.example.backend.controller;

import com.example.backend.dto.request.TourRequest;
import com.example.backend.dto.response.TourResponse;
import com.example.backend.service.TourService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/tours")
@RequiredArgsConstructor
public class TourController {

    private final TourService tourService;

    // Tạo tour mới
    @PostMapping
    public ResponseEntity<TourResponse> createTour(@RequestBody TourRequest request) {
        TourResponse response = tourService.createTour(request);
        return ResponseEntity.ok(response);
    }

    // Cập nhật tour
    @PutMapping("/{id}")
    public ResponseEntity<TourResponse> updateTour(
            @PathVariable Long id,
            @RequestBody TourRequest request
    ) {
        TourResponse response = tourService.updateTour(id, request);
        return ResponseEntity.ok(response);
    }

    // Lấy tour theo ID
    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTourById(@PathVariable Long id) {
        TourResponse response = tourService.getTourById(id);
        return ResponseEntity.ok(response);
    }

    // Lấy tất cả tour
    @GetMapping
    public ResponseEntity<List<TourResponse>> getAllTours() {
        List<TourResponse> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // Xóa tour
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.noContent().build();
    }

    // Tìm kiếm tour theo tên
    @GetMapping("/search")
    public ResponseEntity<List<TourResponse>> searchTours(@RequestParam String name) {
        List<TourResponse> tours = tourService.searchToursByName(name);
        return ResponseEntity.ok(tours);
    }
    // API đếm tổng số tour
    @GetMapping("/count")
    public ResponseEntity<Long> countTours() {
        long count = tourService.countTours();
        return ResponseEntity.ok(count);
    }
}
