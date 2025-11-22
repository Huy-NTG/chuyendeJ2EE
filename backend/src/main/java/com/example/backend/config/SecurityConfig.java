package com.example.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.backend.security.JwtAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
   private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
            // Auth không cần token
                .requestMatchers("/api/auth/**").permitAll()

                // Tour: cho phép xem và tìm kiếm không cần token
                .requestMatchers(HttpMethod.GET, "/api/tours", "/api/tours/*", "/api/tours/search/**").permitAll()

                // Tour: chỉ ADMIN được thêm/sửa/xóa
                .requestMatchers(HttpMethod.POST, "/api/tours/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/tours/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/tours/**").hasRole("ADMIN")

                            // Hotel: cho phép xem và tìm kiếm không cần token
                            .requestMatchers(HttpMethod.GET, "/api/hotels", "/api/hotels/*", "/api/hotels/search/**").permitAll()
                // Admin API
                .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // Các request khác cần đăng nhập
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
