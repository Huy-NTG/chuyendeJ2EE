package com.example.backend.service;

import com.example.backend.dto.request.TourRequest;
import com.example.backend.dto.response.TourResponse;
import com.example.backend.entity.Tours;
import com.example.backend.mapper.TourMapper;
import com.example.backend.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TourService {

    private final TourRepository toursRepository;
    private final TourMapper toursMapper;
    // hàm lưu ảnh
    private String saveImage(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return fileName; // ✅ chỉ lưu tên file, không kèm /uploads/
        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu ảnh: " + e.getMessage());
        }
    }
    // hàm xóa ảnh
    private void deleteImage(String fileName) {
        if (fileName == null || fileName.isEmpty()) return;
        try {
            Path path = Paths.get("uploads/" + fileName);
            Files.deleteIfExists(path); // ✅ Xóa nếu tồn tại, không lỗi nếu file không có
            System.out.println("🗑️ Đã xóa ảnh cũ: " + fileName);
        } catch (IOException e) {
            System.err.println("⚠️ Không thể xóa ảnh: " + e.getMessage());
        }
    }

    // Tạo tour mới
    public TourResponse createTour(TourRequest request) {
        String imageUrl = null;

        if (request.getImage() != null && !request.getImage().isEmpty()) {
            imageUrl = saveImage(request.getImage());
        }

        Tours tour = toursMapper.toEntity(request);
        tour.setImageUrl(imageUrl);

        tour = toursRepository.save(tour);
        return toursMapper.toResponse(tour);
    }

    // ✏️ Cập nhật tour
    public TourResponse updateTour(Long id, TourRequest request) {
        Tours tour = toursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour không tồn tại"));

        // ⚙️ Cập nhật các trường text
        toursMapper.updateEntity(tour, request);

        // 🖼 Nếu có ảnh mới -> xóa ảnh cũ + lưu ảnh mới
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            // 🗑 Xóa ảnh cũ trước
            deleteImage(tour.getImageUrl());

            // 💾 Lưu ảnh mới
            String newImage = saveImage(request.getImage());
            tour.setImageUrl(newImage);
        }

        // 🧩 Lưu thay đổi
        Tours updated = toursRepository.save(tour);
        return toursMapper.toResponse(updated);
    }

    // Lấy tour theo ID
    public TourResponse getTourById(Long id) {
        Tours tour = toursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        return toursMapper.toResponse(tour);
    }

    // Lấy tất cả tour
    public List<TourResponse> getAllTours() {
        return toursRepository.findAll().stream()
                .map(toursMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Xóa tour
    public void deleteTour(Long id) {
        if (!toursRepository.existsById(id)) {
            throw new RuntimeException("Tour not found");
        }
        toursRepository.deleteById(id);
    }

    // Tìm kiếm tour theo tên (ignore case)
    public List<TourResponse> searchToursByName(String name) {
        return toursRepository.findByNameContainingIgnoreCase(name).stream()
                .map(toursMapper::toResponse)
                .collect(Collectors.toList());
    }
    // Đếm tổng số tour
    public long countTours() {
        return toursRepository.count();
    }
}
