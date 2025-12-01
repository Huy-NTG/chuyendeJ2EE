package com.example.backend.controller;

import com.example.backend.dto.request.EmailMessage;
import com.example.backend.kafka.EmailProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailProducer emailProducer;

    @PostMapping("/send")
    public String send(@RequestBody EmailMessage emailMessage) {
        emailProducer.sendEmail(emailMessage);
        return "Queued email to Kafka!";
    }
}
