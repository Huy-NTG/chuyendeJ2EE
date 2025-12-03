package com.example.backend.service;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.UUID;

@Service
public class MomoService {

    @Value("${momo.endpoint}")
    private String endpoint;

    @Value("${momo.partnerCode}")
    private String partnerCode;

    @Value("${momo.accessKey}")
    private String accessKey;

    @Value("${momo.secretKey}")
    private String secretKey;

    @Value("${momo.returnUrl}")
    private String returnUrl;

    @Value("${momo.notifyUrl}")
    private String notifyUrl;

    private String signHmacSHA256(String data, String secretKey) throws Exception {
        Mac hmacSha256 = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "HmacSHA256");
        hmacSha256.init(secretKeySpec);
        return Hex.encodeHexString(hmacSha256.doFinal(data.getBytes()));
    }

    public JSONObject createPayment(long amount, String orderId) throws Exception {

        // orderId = bookingId, để MoMo callback dễ cập nhật booking

        String requestId = UUID.randomUUID().toString();
        String requestType = "captureWallet";

        System.out.println("Notify URL: " + notifyUrl);
        System.out.println("Return URL: " + returnUrl);

        // Tạo raw signature theo chuẩn MoMo
        String rawHash = "accessKey=" + accessKey +
                "&amount=" + amount +
                "&extraData=" +
                "&ipnUrl=" + notifyUrl +
                "&orderId=" + orderId +
                "&orderInfo=Thanh toan booking " + orderId +
                "&partnerCode=" + partnerCode +
                "&redirectUrl=" + returnUrl +
                "&requestId=" + requestId +
                "&requestType=" + requestType;

        String signature = signHmacSHA256(rawHash, secretKey);

        // Build JSON body gửi request MoMo
        JSONObject body = new JSONObject();
        body.put("partnerCode", partnerCode);
        body.put("partnerName", "Test MoMo");
        body.put("storeId", "MomoTestStore");
        body.put("requestId", requestId);
        body.put("amount", amount);
        body.put("orderId", orderId);
        body.put("orderInfo", "Thanh toan booking " + orderId);
        body.put("redirectUrl", returnUrl);
        body.put("ipnUrl", notifyUrl);
        body.put("lang", "vi");
        body.put("extraData", "");
        body.put("requestType", requestType);
        body.put("signature", signature);

        // Gửi request POST đến MoMo API
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(body.toString(), headers);
        String response = restTemplate.postForObject(endpoint, request, String.class);

        return new JSONObject(response); // trả về payUrl / qrCodeUrl
    }

}
