package com.example.backend.mapper;

import com.example.backend.dto.request.HotelRequest;
import com.example.backend.dto.response.HotelResponse;
import com.example.backend.entity.Hotel;
import org.mapstruct.Mapper;
<<<<<<< HEAD
=======
import org.mapstruct.Mapping;
>>>>>>> origin/master
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface HotelMapper {

    // Request -> Entity
    Hotel toEntity(HotelRequest request);

    // Entity -> Response
<<<<<<< HEAD
=======
    @Mapping(target = "status", source = "status")
>>>>>>> origin/master
    HotelResponse toResponse(Hotel hotel);

    // Update Entity từ Request
    void updateEntity(@MappingTarget Hotel hotel, HotelRequest request);
}
