package com.example.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_location", nullable = false)
    private Locations location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url", length = 255)
    private String imageUrl;
    
    private BigDecimal price;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer seats;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
}
