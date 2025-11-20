package com.example.backend.dto.request;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomRequest {
    private String roomNumber;
    private BigDecimal price;
    private Integer capacity;
    private Boolean available;
    private Long hotelId;   // liên kết hotel
}
