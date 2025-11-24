package com.example.backend.service;

import com.example.backend.dto.request.FlightRequest;
import com.example.backend.dto.response.FlightResponse;
import com.example.backend.entity.Flight;
import com.example.backend.mapper.FlightMapper;
import com.example.backend.repository.FlightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FlightService {

    private final FlightRepository flightRepository;
    private final FlightMapper flightMapper;

    // Tạo flight mới
    public FlightResponse createFlight(FlightRequest request) {
        Flight flight = flightMapper.toEntity(request);
        flight = flightRepository.save(flight);
        return flightMapper.toResponse(flight);
    }

    // Cập nhật flight
    public FlightResponse updateFlight(Long id, FlightRequest request) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        flightMapper.updateEntity(flight, request);
        flight = flightRepository.save(flight);
        return flightMapper.toResponse(flight);
    }

    // Lấy flight theo ID
    public FlightResponse getFlightById(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
        return flightMapper.toResponse(flight);
    }

    // Lấy tất cả flight
    public List<FlightResponse> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(flightMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Xóa flight
    public void deleteFlight(Long id) {
        if (!flightRepository.existsById(id)) {
            throw new RuntimeException("Flight not found");
        }
        flightRepository.deleteById(id);
    }
    public void cancelFlight(Long id) {
        Flight flight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        if (flight.getStatus() == Flight.FlightStatus.CANCELLED) {
            throw new RuntimeException("Flight already cancelled");
        }

        if (flight.getStatus() == Flight.FlightStatus.FINISHED) {
            throw new RuntimeException("Cannot cancel a finished flight");
        }

        flight.setStatus(Flight.FlightStatus.CANCELLED);

        flightRepository.save(flight); // cập nhật DB
    }

    // Tìm kiếm flight theo airline (ignore case)
    public List<FlightResponse> searchFlightsByAirline(String airline) {
        return flightRepository.findByAirlineContainingIgnoreCase(airline).stream()
                .map(flightMapper::toResponse)
                .collect(Collectors.toList());
    }
    // Đếm tổng số flight
    public long countFlight() {
        return flightRepository.count();
    }
}
