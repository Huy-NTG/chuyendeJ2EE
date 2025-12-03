//package com.example.email_service.kafka;
//
//import com.example.email_service.dto.EmailMessage;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.RequiredArgsConstructor;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class EmailConsumer {
//
//    private final JavaMailSender mailSender;
//    private final ObjectMapper objectMapper = new ObjectMapper(); // để parse JSON
//
//    @KafkaListener(topics = "send-email", groupId = "email-service-group")
//    public void consume(String messageJson) {
//        try {
//            System.out.println("Nhận JSON từ Kafka: " + messageJson);
//
//            // 1. Convert JSON → EmailMessage
//            EmailMessage emailMessage = objectMapper.readValue(messageJson, EmailMessage.class);
//
//            // 2. Gửi email
//            sendEmail(emailMessage);
//
//            System.out.println("Gửi email thành công đến: " + emailMessage.getTo());
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            System.out.println("Lỗi khi xử lý email: " + e.getMessage());
//        }
//    }
//
//    private void sendEmail(EmailMessage emailMessage) {
//        SimpleMailMessage mail = new SimpleMailMessage();
//        mail.setTo(emailMessage.getTo());
//        mail.setSubject(emailMessage.getSubject());
//        mail.setText(emailMessage.getBody());
//
//        mailSender.send(mail);
//    }
//}
package com.example.email_service.kafka;

import com.example.email_service.dto.EmailMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;

@Service
@RequiredArgsConstructor
public class EmailConsumer {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine; // Thymeleaf
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "send-email", groupId = "email-service-group")
    public void consume(String messageJson) {
        try {
            System.out.println("Nhận JSON từ Kafka: " + messageJson);

            // Convert JSON → EmailMessage
            EmailMessage emailMessage = objectMapper.readValue(messageJson, EmailMessage.class);

            // Gửi email HTML
            sendHtmlEmail(emailMessage);

            System.out.println("Gửi email thành công đến: " + emailMessage.getTo());

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Lỗi khi xử lý email: " + e.getMessage());
        }
    }

    private void sendHtmlEmail(EmailMessage emailMessage) throws Exception {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(emailMessage.getTo());
        helper.setSubject(emailMessage.getSubject());

        // Thymeleaf context
        Context context = new Context();
        context.setVariable("username", emailMessage.getUsername());
        context.setVariable("bookingId", emailMessage.getBookingId());
        context.setVariable("serviceName", emailMessage.getServiceName());

        // bookingDate đã là String → không cần format
        context.setVariable("bookingDate", emailMessage.getBookingDate());

        // totalPrice đã là String → chỉ thêm "VND"
        context.setVariable("totalPrice", emailMessage.getTotalPrice() + " VND");

        // Render template
        String htmlContent = templateEngine.process("bookingSuccess", context);
        helper.setText(htmlContent, true); // true = HTML

        mailSender.send(mimeMessage);
    }
}
