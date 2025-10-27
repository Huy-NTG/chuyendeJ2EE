package com.example.backend.service;

import com.example.backend.dto.request.BookingRequest;
import com.example.backend.dto.response.BookingResponse;
import com.example.backend.entity.Booking;
import com.example.backend.entity.User;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;

    // Tạo booking mới
    public BookingResponse createBooking(BookingRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingMapper.toBooking(request);
        booking.setUser(user); // gắn user vào entity
        booking = bookingRepository.save(booking);

        return bookingMapper.toBookingResponse(booking);
    }

    // Cập nhật booking
    public BookingResponse updateBooking(Long id, BookingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        bookingMapper.updateBooking(booking, request);
        booking = bookingRepository.save(booking);

        return bookingMapper.toBookingResponse(booking);
    }

    // Lấy booking theo ID
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return bookingMapper.toBookingResponse(booking);
    }

    // Lấy tất cả booking của 1 user
    public List<BookingResponse> getBookingsByUserId(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
                .map(bookingMapper::toBookingResponse)
                .collect(Collectors.toList());
    }

    // Xóa booking theo ID
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new RuntimeException("Booking not found");
        }
        bookingRepository.deleteById(id);
    }
}
