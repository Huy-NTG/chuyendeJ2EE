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
                        // ✅ Cho phép public các ảnh
                        .requestMatchers("/uploads/**").permitAll()
                        // ✅ Auth APIs - không cần token
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/momo/callback/**").permitAll()
                        .requestMatchers("/api/momo/create/**").permitAll()
                        .requestMatchers("/api/email/send").permitAll()
                        .requestMatchers("/api/ai/**").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/embedding/**").permitAll()
                        // ✅ Cho phép GET dữ liệu public
                        // ⭐ CHO PHÉP TẤT CẢ FLIGHT API (fix 403 search)
                        .requestMatchers("/api/flights/**").permitAll()
                        .requestMatchers("/api/bookings/**").permitAll()
                                // ⭐ Các API public GET
                        .requestMatchers(HttpMethod.GET,
                                "/api/tours/**",
                                "/api/hotels/**",
                                "/api/users/count",
                                "/api/flights/count",
                                "/api/users/**",
                                "/api/bookings/count").permitAll()
                                .requestMatchers("/api/tours/**").permitAll()
                        // ✅ ADMIN quyền cao
//                        .requestMatchers(HttpMethod.POST, "/api/tours/**", "/api/hotels/**").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.PUT, "/api/tours/**", "/api/hotels/**").hasRole("ADMIN")
//                        .requestMatchers(HttpMethod.DELETE, "/api/tours/**", "/api/hotels/**").hasRole("ADMIN")
                        // Booking
                        // ✅ Các endpoint khác cần đăng nhập
//                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
