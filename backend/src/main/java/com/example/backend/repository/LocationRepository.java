package com.example.backend.repository;
import com.example.backend.entity.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LocationRepository extends JpaRepository<Locations, Long>{
    boolean existsByName(String name);
}
