package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelImageResponse {
    private Long id;
    private String name;
    private String imgUrl;
}
