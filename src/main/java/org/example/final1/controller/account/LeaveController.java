package org.example.final1.controller.account;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leave")
public class LeaveController {
    @Autowired
    UserService userservice;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @GetMapping("/account")
    public String leaveAccount(@RequestHeader("Authorization") String authorizationHeader, HttpServletResponse response) {
        // Bearer <JWT 토큰>에서 "Bearer " 부분을 제거하여 순수한 JWT 토큰만 추출
        String token = authorizationHeader.replace("Bearer ", "");
        int user_Id = jwtTokenProvider.getUserId(token);
        // HttpOnly 쿠키 삭제
        Cookie cookie = new Cookie("refreshToken", null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // 만료시킴
        response.addCookie(cookie);

        userservice.deleteUserById(user_Id);


        // 성공 메시지와 함께 200 OK 상태 코드 반환
        return "success";
    }

    @GetMapping("/oauth")
    public String leaveOauth(HttpServletResponse response, HttpServletRequest request) {
        // 쿠키에서 jwtToken 추출
        Cookie[] cookies = request.getCookies();
        String jwtToken = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        if (jwtToken != null && jwtTokenProvider.validateToken(jwtToken)) {
            int user_Id = jwtTokenProvider.getUserId(jwtToken);

            // 쿠키 삭제 로직 (jwtToken 및 refreshToken)
            Cookie refreshTokenCookie = new Cookie("refreshToken", null);
            refreshTokenCookie.setPath("/");
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setMaxAge(0);
            response.addCookie(refreshTokenCookie);

            Cookie jwtTokenCookie = new Cookie("jwtToken", null);
            jwtTokenCookie.setPath("/");
            jwtTokenCookie.setHttpOnly(true);
            jwtTokenCookie.setMaxAge(0);
            response.addCookie(jwtTokenCookie);

            // 사용자 삭제
            userservice.deleteUserById(user_Id);

            return "success";
        } else {
            return "invalid_token";
        }
    }

}
