package com.example.backend.dto.response;

import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String username;
    private String email;
    private String role;
    private String token;
    private String phone;
}
