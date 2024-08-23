package org.example.final1.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.example.final1.config.auth.PrincipalDetails;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

         PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

         String jwtToken= JWT.create()
                .withSubject("quizverse토큰")
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))//현재시간+추가시간=만료시간.
                .withClaim("user_id",principalDetails.getUserDto().getUser_id())
                .withClaim("user_email", principalDetails.getUserDto().getUser_email())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    // JWT 토큰을 일반 쿠키로 저장 (HttpOnly 속성 제거)
    Cookie jwtCookie = new Cookie("token", jwtToken);
    jwtCookie.setHttpOnly(false); // JavaScript에서 접근 가능
    jwtCookie.setSecure(false); // HTTPS가 아니어도 전송 (로컬 개발용)
    jwtCookie.setPath("/");
    jwtCookie.setMaxAge(7 * 24 * 60 * 60); // 쿠키의 유효 기간 설정 (예: 7일)

    response.addCookie(jwtCookie);

    // 클라이언트를 기본 페이지로 리다이렉트
    response.sendRedirect("http://localhost:3000/");

    }
}
