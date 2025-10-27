package com.example.backend.dto.request;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourRequest {
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer seats;
}
