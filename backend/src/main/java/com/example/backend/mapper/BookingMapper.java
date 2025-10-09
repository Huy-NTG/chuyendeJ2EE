package com.example.backend.mapper;

import com.example.backend.dto.request.BookingRequest;
import com.example.backend.dto.response.BookingResponse;
import com.example.backend.entity.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    // Convert từ Request -> Entity
    @Mapping(target = "user.id", source = "userId")
    Booking toBooking(BookingRequest request);

    // Convert từ Entity -> Response
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "username", source = "user.username")
    BookingResponse toBookingResponse(Booking booking);

    // Update từ Request vào Entity hiện có
    @Mapping(target = "user.id", source = "userId", ignore = true) // tránh ghi đè user khi update
    void updateBooking(@MappingTarget Booking booking, BookingRequest request);
}
