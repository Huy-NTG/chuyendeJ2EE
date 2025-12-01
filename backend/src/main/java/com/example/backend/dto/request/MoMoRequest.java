package com.example.backend.dto.request;

import java.util.UUID;

public class MoMoRequest {
    private String partnerCode = "MOMO";
    private String accessKey = "F8BBA842ECF85";
    private String secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    private String orderId = UUID.randomUUID().toString();
    private int amount = 100000; // số tiền test
    private String orderInfo = "Thanh toán test sandbox";
    private String returnUrl = "https://your-server.com/return";
    private String notifyUrl = "https://your-server.com/ipn";
    private String extraData = "";
}

