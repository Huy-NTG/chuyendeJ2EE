package com.example.backend.service;
import com.example.backend.dto.request.RoomRequest;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Hotel;
import com.example.backend.entity.Room;
import com.example.backend.repository.HotelRepository;
import com.example.backend.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    private RoomResponse mapToResponse(Room room) {
        return RoomResponse.builder()
                .id(room.getId())
                .roomNumber(room.getRoomNumber())
                .price(room.getPrice())
                .capacity(room.getCapacity())
                .available(room.getAvailable())
                .imageUrl(room.getImageUrl())
                .build();
    }

    public RoomResponse create(RoomRequest request) {
        Hotel hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Room room = Room.builder()
                .roomNumber(request.getRoomNumber())
                .price(request.getPrice())
                .capacity(request.getCapacity())
                .available(request.getAvailable())
                .hotel(hotel)
                .imageUrl(request.getImageUrl()) // ⭐ BẮT BUỘC
                .build();

        roomRepository.save(room);
        return mapToResponse(room);
    }

    public RoomResponse update(Long id, RoomRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNumber(request.getRoomNumber());
        room.setPrice(request.getPrice());
        room.setCapacity(request.getCapacity());
        room.setAvailable(request.getAvailable());
        room.setImageUrl(request.getImageUrl()); // ⭐ phải có
        roomRepository.save(room);
        return mapToResponse(room);
    }

    public void delete(Long id) {
        roomRepository.deleteById(id);
    }

    public RoomResponse getById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        return mapToResponse(room);
    }

    public List<RoomResponse> getByHotel(Long hotelId) {
        return roomRepository.findByHotelId(hotelId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}
