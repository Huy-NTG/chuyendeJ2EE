package com.example.backend.dto.request;

import lombok.*;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HotelRequest {
    private String name;
    private String location;
    private String description;
    private String address;
    private String imgUrl;
}

