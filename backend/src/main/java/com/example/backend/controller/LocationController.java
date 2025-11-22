package com.example.backend.controller;
import com.example.backend.entity.Locations;
import com.example.backend.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/locations")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @GetMapping
    public ResponseEntity<List<Locations>> getAll() {
        return ResponseEntity.ok(locationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Locations> getById(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Locations> create(@RequestBody Locations location) {
        return ResponseEntity.ok(locationService.create(location));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Locations> update(@PathVariable Long id, @RequestBody Locations location) {
        return ResponseEntity.ok(locationService.update(id, location));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        locationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
