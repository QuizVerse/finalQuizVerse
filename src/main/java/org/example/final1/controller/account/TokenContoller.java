package org.example.final1.controller.account;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.example.final1.jwt.JwtProperties;
import org.example.final1.jwt.JwtTokenProvider;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequiredArgsConstructor
public class TokenContoller {

    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/api/refresh-token")
    public String refreshAccessToken(HttpServletRequest request, HttpServletResponse response) {

        //쿠키에서 리프레시 토큰을 가지고온다.
        String refreshToken= Arrays.stream(request.getCookies())
                .filter(cookie->"refreshToken".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        if (refreshToken != null && jwtTokenProvider.validateToken(refreshToken)) {
            int userId = jwtTokenProvider.getUserId(refreshToken);
            String jwtToken = jwtTokenProvider.createToken(userId, jwtTokenProvider.getUserEmail(refreshToken));

            // 새로운 액세스 토큰 쿠키로 전송
            Cookie newAccessTokenCookie = new Cookie("jwtToken", jwtToken);
            newAccessTokenCookie.setHttpOnly(false);
            newAccessTokenCookie.setSecure(true);
            newAccessTokenCookie.setPath("/");
            newAccessTokenCookie.setMaxAge((int) JwtProperties.EXPIRATION_TIME / 1000);

            response.addCookie(newAccessTokenCookie);
            return "New access token issued";
        } else {
            return "Invalid refresh token, please login again";
        }

    }
}
