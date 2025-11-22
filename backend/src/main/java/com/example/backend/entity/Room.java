package com.example.backend.entity;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomNumber;       // Số phòng, ví dụ: A101
    @Column(nullable = false)
    private BigDecimal price;        // Giá phòng
    private Integer capacity;        // Số người tối đa
    private Boolean available;       // Có còn trống không?
    // 🔗 Nhiều Room thuộc về 1 Hotel
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
}
