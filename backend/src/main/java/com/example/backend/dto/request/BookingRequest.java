package com.example.backend.dto.request;

import com.example.backend.entity.Booking;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    private Long userId;
    private Booking.ServiceType serviceType;
    private Long serviceId;
    private LocalDateTime bookingDate;
    private BigDecimal totalPrice;
    private Booking.BookingStatus status;
}
