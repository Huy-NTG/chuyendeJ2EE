package com.example.backend.repository;

import com.example.backend.entity.HotelImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
<<<<<<< HEAD

public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
    List<HotelImage> findByHotelId(Long hotelId);
=======
import java.util.Optional;

public interface HotelImageRepository extends JpaRepository<HotelImage, Long> {
    List<HotelImage> findByHotelId(Long hotelId);
    // Lấy tất cả ảnh theo hotelId và sắp xếp tăng dần
    List<HotelImage> findByHotelIdOrderByIdAsc(Long hotelId);

    // Lấy ảnh đầu
    Optional<HotelImage> findFirstByHotelIdOrderByIdAsc(Long hotelId);
>>>>>>> origin/master
}
