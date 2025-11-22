package com.example.backend.dto.response;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TourImageResponse {
    private Long id;
    private String name;
    private String imgUrl;
}
