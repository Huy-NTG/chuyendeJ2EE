package com.example.backend.repository;
import com.example.backend.entity.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import javax.xml.stream.Location;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Locations, Long>{
    boolean existsByName(String name);
    List<Locations> findByNameContainingIgnoreCase(String keyword);
    Optional<Locations> findByNameIgnoreCase(String name);
}
