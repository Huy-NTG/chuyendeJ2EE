package com.example.backend.service;

import com.example.backend.entity.Tours;
import com.example.backend.repository.TourRepository;
import java.util.List;
import org.springframework.stereotype.Service;
@Service
public class TourService {
    private final TourRepository tourRepository;

    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public List<Tours> getAllTours() {
        return tourRepository.findAll();
    }

    public Tours getTourById(Long id) {
        return tourRepository.findById(id).orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    public Tours createTour(Tours tour) {
        return tourRepository.save(tour);
    }

    public Tours updateTour(Long id, Tours updatedTour) {
        Tours tour = getTourById(id);
        tour.setName(updatedTour.getName());
        tour.setLocation(updatedTour.getLocation());
        tour.setDescription(updatedTour.getDescription());
        tour.setPrice(updatedTour.getPrice());
        tour.setStartDate(updatedTour.getStartDate());
        tour.setEndDate(updatedTour.getEndDate());
        tour.setSeats(updatedTour.getSeats());
        return tourRepository.save(tour);
    }

    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }
    public List<Tours> searchToursByName(String name) {
        return tourRepository.findByNameContainingIgnoreCase(name);
    }
}
