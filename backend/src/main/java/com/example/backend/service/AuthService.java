package com.example.backend.service;

import com.example.backend.entity.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.RegisterRequest;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtils;
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone()); // 👈 set phone
        user.setRole("USER"); // mặc định USER
        // createdAt đã set mặc định LocalDateTime.now()

        User saved = userRepository.save(user);
        String token = jwtUtils.generateToken(saved.getUsername(), saved.getRole());

        return new UserResponse(saved.getId(), saved.getUsername(),
                saved.getEmail(), saved.getRole(), token);
    }
    // hàm mã hóa mật khẩu đã bị xóa
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtils.generateToken(user.getUsername(), user.getRole());
        return new UserResponse(user.getId(), user.getUsername(),
                user.getEmail(), user.getRole(), token);
    }
}