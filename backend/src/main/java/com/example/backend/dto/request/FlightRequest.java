package com.example.backend.dto.request;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FlightRequest {
    private String airline;
    private String fromLocation;
    private String toLocation;
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;
    private BigDecimal price;
    private Integer seats;
}