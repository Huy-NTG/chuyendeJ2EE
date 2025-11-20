package com.example.backend.mapper;

import com.example.backend.dto.request.HotelImageResponse;
import com.example.backend.entity.HotelImage;

public class HotelImageMapper {
    public HotelImageResponse toResponse(HotelImage entity) {
        return HotelImageResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .imgUrl(entity.getImgUrl())
                .build();
    }
}
