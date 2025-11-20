package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "hotel_images")
public class HotelImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_hotel")
    private Long hotelId;

    private String name;

    @Column(name = "img_url", length = 2048)
    private String imgUrl;

    // Liên kết về Hotel
    @ManyToOne
    @JoinColumn(name = "id_hotel", insertable = false, updatable = false)
    private Hotel hotel;
}
