package com.example.backend.controller;

import com.example.backend.dto.request.HotelRequest;
import com.example.backend.dto.response.HotelResponse;
import com.example.backend.service.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService hotelService;

    @PostMapping
    public ResponseEntity<HotelResponse> createHotel(@RequestBody HotelRequest request) {
        HotelResponse response = hotelService.createHotel(request);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelResponse> updateHotel(
            @PathVariable Long id,
            @RequestBody HotelRequest request
    ) {
        HotelResponse response = hotelService.updateHotel(id, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> getHotelById(@PathVariable Long id) {
        HotelResponse response = hotelService.getHotelById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<HotelResponse>> getAllHotels() {
        List<HotelResponse> hotels = hotelService.getAllHotels();
        return ResponseEntity.ok(hotels);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id) {
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<HotelResponse>> searchHotels(@RequestParam String name) {
        // nếu muốn search theo name hoặc location thì thêm repository method
        List<HotelResponse> hotels = hotelService.searchHotelsByName(name);
        return ResponseEntity.ok(hotels);
    }
}
