package com.example.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    private final JwtUtils jwtUtils;

    public JwtAuthenticationFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    // 🔑 CHỈNH SỬA QUAN TRỌNG: Loại trừ đường dẫn Auth
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        // Trả về TRUE nếu filter KHÔNG nên chạy
        // Đường dẫn đăng nhập/đăng ký không cần token
        String path = request.getServletPath();
        return path.startsWith("/api/auth/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                String username = jwtUtils.getUsername(token);
                String role = jwtUtils.getRole(token);

                // Tạo Authentication object
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + role)));

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
//@Override
//protected void doFilterInternal(HttpServletRequest request,
//                                HttpServletResponse response,
//                                FilterChain filterChain)
//        throws ServletException, IOException {
//
//    String header = request.getHeader("Authorization");
//
//    // Nếu không có header hoặc không phải Bearer token, tiếp tục chuỗi filter
//    if (header == null || !header.startsWith("Bearer ")) {
//        filterChain.doFilter(request, response);
//        return;
//    }
//
//    String token = header.substring(7);
//
//    try {
//        String username = jwtUtils.getUsername(token);
//        String role = jwtUtils.getRole(token);
//
//        // Tạo Authentication object
//        UsernamePasswordAuthenticationToken authentication =
//                new UsernamePasswordAuthenticationToken(username, null,
//                        List.of(new SimpleGrantedAuthority("ROLE_" + role)));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//    } catch (Exception e) {
//        // Token không hợp lệ: xóa ngữ cảnh bảo mật và cho request tiếp tục.
//        // Các bộ lọc bảo mật sau đó sẽ chặn request nếu nó không phải là public.
//        SecurityContextHolder.clearContext();
//    }

    // Tiếp tục chuỗi filter
//    filterChain.doFilter(request, response);

}
