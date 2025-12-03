package com.example.email_service.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessage {
    private String to;
    private String subject;
    private String username;
    private String bookingId;
    private String serviceType;
    private String serviceName;
    private String bookingDate;
    private String totalPrice;
}