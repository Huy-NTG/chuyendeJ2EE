package com.example.backend.mapper;

import com.example.backend.dto.request.TourRequest;
import com.example.backend.dto.response.TourResponse;
import com.example.backend.entity.Tours;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TourMapper {

    // Request -> Entity
    Tours toEntity(TourRequest request);


    // Entity -> Response
    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "locationText", target = "locationText")  // 👈 THÊM DÒNG NÀY
    TourResponse toResponse(Tours tours);

    // Update entity từ Request
    void updateEntity(@MappingTarget Tours tours, TourRequest request);
}
