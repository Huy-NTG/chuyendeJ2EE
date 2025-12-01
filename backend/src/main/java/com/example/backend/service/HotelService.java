package com.example.backend.service;

import com.example.backend.dto.request.HotelRequest;
import com.example.backend.dto.response.HotelResponse;
import com.example.backend.entity.Hotel;
import com.example.backend.mapper.HotelMapper;
import com.example.backend.repository.HotelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;

    // Tạo hotel mới
    public HotelResponse createHotel(HotelRequest request) {
        Hotel hotel = hotelMapper.toEntity(request);
        hotel = hotelRepository.save(hotel);
        return hotelMapper.toResponse(hotel);
    }

    // Cập nhật hotel
    public HotelResponse updateHotel(Long id, HotelRequest request) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        hotelMapper.updateEntity(hotel, request);
        hotel = hotelRepository.save(hotel);
        return hotelMapper.toResponse(hotel);
    }

    // Lấy hotel theo ID
    public HotelResponse getHotelById(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
        return hotelMapper.toResponse(hotel);
    }

    // Lấy tất cả hotel
    public List<HotelResponse> getAllHotels() {
        return hotelRepository.findAll().stream()
                .map(hotelMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Xóa hotel theo ID
    public void deleteHotel(Long id) {
        if (!hotelRepository.existsById(id)) {
            throw new RuntimeException("Hotel not found");
        }
        hotelRepository.deleteById(id);
    }
    // chuyển trạng thái
    public void toggleHotelStatus(Long id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        if (hotel.getStatus() == Hotel.HotelStatus.CLOSED) {
            throw new RuntimeException("Cannot modify a CLOSED hotel");
        }

        Hotel.HotelStatus newStatus =
                hotel.getStatus() == Hotel.HotelStatus.ACTIVE
                        ? Hotel.HotelStatus.INACTIVE
                        : Hotel.HotelStatus.ACTIVE;

        hotel.setStatus(newStatus);

        hotelRepository.save(hotel);
    }



    // Tìm kiếm hotel theo tên (ignore case)
    public List<HotelResponse> searchHotelsByName(String name) {
        return hotelRepository.findByNameContainingIgnoreCase(name).stream()
                .map(hotelMapper::toResponse)
                .collect(Collectors.toList());
    }

    public List<HotelResponse> serchHotelsByLocation(String location){
    	return hotelRepository.findByLocationContainingIgnoreCase(location).stream()
    			.map(hotelMapper::toResponse)
    			.collect(Collectors.toList());
    }
    // Đếm tổng số tour
    public long countHotels() {
        return hotelRepository.count();
    }
}
