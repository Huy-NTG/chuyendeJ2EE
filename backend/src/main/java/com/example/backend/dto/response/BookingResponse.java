package com.example.backend.dto.response;

import com.example.backend.entity.Booking;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponse {
    private Long id;
    private Long userId;
    private String username;
    private Booking.ServiceType serviceType;
    private Long serviceId;
    private LocalDateTime bookingDate;
    private LocalDateTime updatedAt;
    private Booking.BookingStatus status;
    private BigDecimal totalPrice;
}
