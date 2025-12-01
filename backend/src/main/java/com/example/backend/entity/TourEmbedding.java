package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourEmbedding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Quan hệ 1-1 với bảng Tours
    @OneToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "id", nullable = false, unique = true)
    private Tours tour;

    // Lưu UUID point trong Qdrant
    @Column(name = "qdrant_point_id", nullable = false, unique = true, length = 36)
    private String qdrantPointId;
}
