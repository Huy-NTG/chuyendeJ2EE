package com.example.backend.service;

import com.example.backend.dto.response.TourImageResponse;
import com.example.backend.entity.TourImage;
import com.example.backend.mapper.TourImageMapper;
import com.example.backend.repository.TourImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TourImageService {
    private final TourImageRepository tourImageRepository;
    private final TourImageMapper tourImageMapper;
    public List<TourImageResponse> getImagesByTourId(Long tourId) {
        return tourImageRepository.findByTourId(tourId)
                .stream()
                .map(tourImageMapper::toResponse)
                .toList();
    }
}
