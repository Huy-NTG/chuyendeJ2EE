package com.example.backend.mapper;
import com.example.backend.dto.response.TourImageResponse;
import com.example.backend.entity.TourImage;
import org.springframework.stereotype.Component;

@Component
public class TourImageMapper {
    public TourImageResponse toResponse(TourImage entity) {
        return TourImageResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .imgUrl(entity.getImgUrl())
                .build();
    }
}
