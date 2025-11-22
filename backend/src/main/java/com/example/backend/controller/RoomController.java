package com.example.backend.controller;
import com.example.backend.dto.request.RoomRequest;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @PostMapping
    public RoomResponse create(@RequestBody RoomRequest request) {
        return roomService.create(request);
    }

    @PutMapping("/{id}")
    public RoomResponse update(@PathVariable Long id, @RequestBody RoomRequest request) {
        return roomService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roomService.delete(id);
    }

    @GetMapping("/{id}")
    public RoomResponse getById(@PathVariable Long id) {
        return roomService.getById(id);
    }

    @GetMapping("/hotel/{hotelId}")
    public List<RoomResponse> getRoomsByHotel(@PathVariable Long hotelId) {
        return roomService.getByHotel(hotelId);
    }
}
