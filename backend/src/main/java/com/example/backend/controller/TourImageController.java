package com.example.backend.controller;

import com.example.backend.dto.response.TourImageResponse;
import com.example.backend.entity.TourImage;
import com.example.backend.service.TourImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/toursimages")
@RequiredArgsConstructor
public class TourImageController {
    private final TourImageService tourImageService;

    @GetMapping("/{tourId}/images")
    public List<TourImageResponse> getImages(@PathVariable Long tourId) {
        return tourImageService.getImagesByTourId(tourId);
    }
}
