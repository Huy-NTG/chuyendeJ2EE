package com.example.backend.controller;

import com.example.backend.service.HotelImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/hotels/images")
@RequiredArgsConstructor
public class HotelImageController {
    private final HotelImageService hotelImageService;

    @PutMapping("/{imageId}")
    public ResponseEntity<?> updateImage(
            @PathVariable Long imageId,
            @RequestParam("image") MultipartFile file) {

        String newFileName = hotelImageService.updateHotelImage(imageId, file);

        return ResponseEntity.ok("Updated successfully: " + newFileName);
    }
}
