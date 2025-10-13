package com.example.backend.repository;

import com.example.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByServiceTypeAndServiceId(Booking.ServiceType serviceType, Long serviceId);

    List<Booking> findByStatus(Booking.BookingStatus status);
    List<Booking> findByServiceType(Booking.ServiceType serviceType);
}
