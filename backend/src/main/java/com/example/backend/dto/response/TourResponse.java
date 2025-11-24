package com.example.backend.dto.response;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourResponse {
    private Long id;
    private String name;

    private String locationText;
    private Long locationId;

    private String description;
    private String imageUrl;
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer seats;
    private LocalDateTime createdAt;
}
