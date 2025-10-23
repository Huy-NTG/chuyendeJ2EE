package com.example.backend.dto.response;

import lombok.*;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelResponse {
    private Long id;
    private String name;
    private String location;
    private String description;
    private BigDecimal pricePerNight;
    private Integer availableRooms;
    private LocalDateTime createdAt;
}
