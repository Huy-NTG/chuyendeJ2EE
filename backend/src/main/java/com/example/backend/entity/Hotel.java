package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hotels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

//    @Column(name = "price_per_night", nullable = false)
//    private BigDecimal pricePerNight;

    @Column(name = "available_rooms", nullable = false)
    private Integer availableRooms;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "address")
    private String address;
    // ➕ Hotel có nhiều Room
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Room> rooms = new ArrayList<>();
    @OneToMany(mappedBy = "hotel", cascade = CascadeType.ALL)
    private List<HotelImage> images = new ArrayList<>();

}
