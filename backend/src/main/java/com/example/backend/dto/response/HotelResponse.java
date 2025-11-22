package com.example.backend.dto.response;

import com.example.backend.dto.request.HotelImageResponse;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
    private String address;
    private List<HotelImageResponse> images;
}
    