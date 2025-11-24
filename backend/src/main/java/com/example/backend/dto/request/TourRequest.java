package com.example.backend.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourRequest {
    private String name;
    private Long locationId; // 🔥 Sửa lại field này
    private String description;
    private BigDecimal price;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer seats;
    private MultipartFile image; // ✅ Thêm dòng này
}
