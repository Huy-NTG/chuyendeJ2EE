package com.example.backend.controller;

import com.example.backend.dto.request.EmailMessage;
import com.example.backend.entity.Booking;
import com.example.backend.kafka.EmailProducer;
import com.example.backend.service.BookingService;
import com.example.backend.service.TourService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/momo")
@RequiredArgsConstructor
public class MomoCallbackController {
    private final BookingService bookingService;
    private final EmailProducer emailProducer;
    private final UserService userService;
    private final TourService tourService;

    @PostMapping("/callback")
    public ResponseEntity<Map<String, Object>> momoCallback(@RequestBody Map<String, Object> data) {

        System.out.println("===== MOMO CALLBACK =====");
        System.out.println(data);

        String orderIdRaw = (String) data.get("orderId");

        // orderId dạng "13_1764540548451" → tách lấy trước dấu _
        String bookingIdStr = orderIdRaw.split("_")[0];

        Long bookingId = Long.valueOf(bookingIdStr);

        EmailMessage emailMessage = new EmailMessage(userService.getUserById(bookingService.findById(bookingId).getUserId()).getEmail(),
                "Hóa đơn thanh toán",
                userService.getUserById(bookingService.findById(bookingId).getUserId()).getUsername(),
                bookingIdStr,
                bookingService.findById(bookingId).getServiceType().toString(),
                tourService.getTourById(bookingService.findById(bookingId).getServiceId()).getName(),
                bookingService.findById(bookingId).getBookingDate().toString(),
                bookingService.findById(bookingId).getTotalPrice().toString());;

        int resultCode = (Integer) data.get("resultCode");

        if (resultCode == 0) {
            bookingService.updateStatus(bookingId, Booking.BookingStatus.PAID);
            emailProducer.sendEmail(emailMessage);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("resultCode", 0);
        response.put("message", "OK");

        return ResponseEntity.ok(response);
    }

}
