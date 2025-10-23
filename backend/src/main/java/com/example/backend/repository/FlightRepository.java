package com.example.backend.repository;


import com.example.backend.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByAirlineContainingIgnoreCase(String airline);
}
