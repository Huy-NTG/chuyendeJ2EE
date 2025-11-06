package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.entity.Tours;
@Repository
public interface  TourRepository extends JpaRepository<Tours, Long>{
    List<Tours> findByNameContainingIgnoreCase(String name);
    List<Tours> findByLocationContainingIgnoreCase(String location);

}
