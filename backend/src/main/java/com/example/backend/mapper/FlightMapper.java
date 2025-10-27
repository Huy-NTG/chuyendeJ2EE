package com.example.backend.mapper;

import com.example.backend.dto.request.FlightRequest;
import com.example.backend.dto.response.FlightResponse;
import com.example.backend.entity.Flight;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FlightMapper {

    // Request -> Entity
    Flight toEntity(FlightRequest request);

    // Entity -> Response
    FlightResponse toResponse(Flight flight);

    // Update Entity từ Request
    void updateEntity(@MappingTarget Flight flight, FlightRequest request);
}
