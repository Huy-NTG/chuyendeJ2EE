package com.example.backend.dto.request;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRequest {
    private String name;
    private String location;
    private String description;
    private BigDecimal pricePerNight;
    private Integer availableRooms;
    private String address;
}

