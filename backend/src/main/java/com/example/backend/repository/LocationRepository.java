package com.example.backend.repository;
import com.example.backend.entity.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import javax.swing.text.html.Option;
import javax.xml.stream.Location;
import java.util.List;
import java.util.Optional;
=======
import java.util.List;
>>>>>>> origin/master

@Repository
public interface LocationRepository extends JpaRepository<Locations, Long>{
    boolean existsByName(String name);
    List<Locations> findByNameContainingIgnoreCase(String keyword);
<<<<<<< HEAD
    Optional<Locations> findByNameIgnoreCase(String name);
=======

>>>>>>> origin/master
}
