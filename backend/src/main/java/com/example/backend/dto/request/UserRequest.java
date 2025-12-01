package com.example.backend.dto.request;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role;
    private String name;
}
