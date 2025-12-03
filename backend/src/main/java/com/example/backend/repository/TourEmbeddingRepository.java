package com.example.backend.repository;

import com.example.backend.entity.TourEmbedding;
import com.example.backend.entity.Tours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TourEmbeddingRepository extends JpaRepository<TourEmbedding, Long> {
    Optional<TourEmbedding> findByTour(Tours tour);
    void deleteByTour(Tours tour);
}
