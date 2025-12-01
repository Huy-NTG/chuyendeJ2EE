package com.example.backend.controller;


import com.example.backend.dto.response.BookingResponse;
import com.example.backend.entity.Booking;
import com.example.backend.service.BookingService;
import com.example.backend.service.MomoService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/momo")
@RequiredArgsConstructor
public class MomoController {

    private final MomoService momoService;           // service xử lý MoMo
    private final BookingService bookingService;     // service xử lý booking

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@RequestParam Long bookingId) {
        try {
            // Lấy booking để biết amount
            BookingResponse booking = bookingService.findById(bookingId);
            long amount = booking.getTotalPrice().longValue();

            // Gọi service để tạo payment
            // Tạo orderId duy nhất: bookingId + timestamp
            String orderId = bookingId + "_" + System.currentTimeMillis();

            JSONObject momoResponse = momoService.createPayment(amount, orderId);
            System.err.println("MoMo error: " + momoResponse);
            // Trả về FE
            Map<String, Object> response = new HashMap<>();
            response.put("payUrl", momoResponse.getString("payUrl"));
            response.put("qrCodeUrl", momoResponse.optString("qrCodeUrl"));
            response.put("amount", amount);
            response.put("orderId", bookingId);
            response.put("notifyUrl", momoService);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}


