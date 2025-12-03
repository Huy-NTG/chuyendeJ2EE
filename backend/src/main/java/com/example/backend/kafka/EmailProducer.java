package com.example.backend.kafka;

import com.example.backend.dto.request.EmailMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailProducer {

    private final KafkaTemplate<String, EmailMessage> kafkaTemplate;

    public void sendEmail(EmailMessage message) {
        kafkaTemplate.send("send-email", message);
        System.out.println("📨 Sent email message to Kafka: " + message);
    }
}
