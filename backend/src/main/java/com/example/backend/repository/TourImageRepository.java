package com.example.backend.repository;
import com.example.backend.entity.TourImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface TourImageRepository extends JpaRepository<TourImage, Long> {
    List<TourImage> findByTourId(Long tourId);
}
