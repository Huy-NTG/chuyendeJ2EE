package com.example.backend.dto.response;
import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomResponse {
    private Long id;
    private String roomNumber;
    private BigDecimal price;
    private Integer capacity;
    private Boolean available;
}
