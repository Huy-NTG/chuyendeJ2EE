package com.example.backend.service;

import com.example.backend.entity.Locations;
import com.example.backend.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;

    public List<Locations> getAll() {
        return locationRepository.findAll();
    }

    public Locations getById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy địa điểm có ID = " + id));
    }

    public Locations create(Locations location) {
        if (locationRepository.existsByName(location.getName())) {
            throw new RuntimeException("Tên địa điểm đã tồn tại!");
        }
        return locationRepository.save(location);
    }

    public Locations update(Long id, Locations updatedLocation) {
        Locations location = getById(id);
        location.setName(updatedLocation.getName());
        location.setDescription(updatedLocation.getDescription());
        return locationRepository.save(location);
    }

    public void delete(Long id) {
        Locations location = getById(id);
        locationRepository.delete(location);
    }
    // ⭐ HÀM TÌM KIẾM THEO TÊN
    public List<Locations> searchByName(String keyword) {
        return locationRepository.findByNameContainingIgnoreCase(keyword);
    }
}
