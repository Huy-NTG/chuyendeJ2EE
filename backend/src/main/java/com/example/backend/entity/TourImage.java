package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "tour_images")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class TourImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_tour")
    private Long tourId;

    private String name;

    @Column(name = "img_url", length = 2048)
    private String imgUrl;
}
