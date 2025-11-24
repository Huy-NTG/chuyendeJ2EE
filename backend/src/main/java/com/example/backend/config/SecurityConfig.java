package com.example.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.backend.security.JwtAuthenticationFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UrlBasedCorsConfigurationSource corsConfigurationSource;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          UrlBasedCorsConfigurationSource corsConfigurationSource) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsConfigurationSource = corsConfigurationSource;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                .authorizeHttpRequests(auth -> auth
                        // Public static files
                        .requestMatchers("/uploads/**").permitAll()

                        // Auth APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // ⭐ CHO PHÉP TẤT CẢ FLIGHT API (fix 403 search)
                        .requestMatchers("/api/flights/**").permitAll()

                        // ⭐ Các API public GET
                        .requestMatchers(HttpMethod.GET,
                                "/api/tours/**",
                                "/api/hotels/**",
                                "/api/users/count",
                                "/api/bookings/count"
                        ).permitAll()

                        // ⭐ Cho phép thêm các API khác bạn đang dùng
                        .requestMatchers(
                                "/api/tours/**",
                                "/api/hotels/**",
                                "/api/locations/**",
                                "/api/rooms/**",
                                "/api/toursimages/**"
                        ).permitAll()

                        // Các API còn lại yêu cầu đăng nhập
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
