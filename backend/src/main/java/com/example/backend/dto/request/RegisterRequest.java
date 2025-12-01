package com.example.backend.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;
}
