package com.example.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer seats;
}
