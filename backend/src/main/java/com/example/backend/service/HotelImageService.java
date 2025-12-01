package com.example.backend.service;

import com.example.backend.entity.HotelImage;
import com.example.backend.repository.HotelImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class HotelImageService {
    private final HotelImageRepository hotelImageRepository;

    // -----------------------------
    // HÀM LƯU ẢNH
    // -----------------------------
    private String saveImage(MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadDir = Paths.get("uploads/");
            Files.createDirectories(uploadDir);  // Tạo thư mục nếu chưa có

            Path path = uploadDir.resolve(fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

            return fileName; // Chỉ lưu tên file
        } catch (IOException e) {
            throw new RuntimeException("Không thể lưu ảnh: " + e.getMessage());
        }
    }

    // -----------------------------
    // HÀM XÓA ẢNH
    // -----------------------------
    private void deleteImage(String fileName) {
        if (fileName == null || fileName.isEmpty()) return;

        try {
            Path path = Paths.get("uploads/" + fileName);
            Files.deleteIfExists(path);
            System.out.println("🗑️ Đã xóa ảnh cũ: " + fileName);
        } catch (IOException e) {
            System.err.println("⚠️ Không thể xóa ảnh: " + e.getMessage());
        }
    }

    // -----------------------------
    // API CẬP NHẬT ẢNH THEO ID
    // -----------------------------
    public String updateHotelImage(Long imageId, MultipartFile file) {

        // 1️⃣ Tìm image theo ID
        HotelImage image = hotelImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ảnh"));

        // 2️⃣ Xóa file cũ
        deleteImage(image.getImgUrl());

        // 3️⃣ Lưu file mới
        String newFileName = saveImage(file);

        // 4️⃣ Cập nhật DB
        image.setImgUrl(newFileName);
        hotelImageRepository.save(image);

        return newFileName;
    }
}
