package org.example.final1.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // JwtProperties에서 상수 가져오기
    private final String SECRET_KEY = JwtProperties.SECRET;
    private final int EXPIRATION_TIME = JwtProperties.EXPIRATION_TIME;
    private final long REFRESH_EXPIRATION_TIME = JwtProperties.REFRESH_EXPIRATION_TIME;

    // JWT 생성 메서드 -> access token
    public String createToken(int userId, String userEmail) {
        return JWT.create()
                .withSubject("quizverse토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .withClaim("user_id", userId)
                .withClaim("user_email", userEmail)

                .sign(Algorithm.HMAC512(SECRET_KEY)); // HMAC512 알고리즘 사용
    }

    // JWT 생성 메서드 (만료 시간이 다를 경우) -> refresh token
    public String createToken(int userId, String userEmail, long expirationTime) {
        return JWT.create()
                .withSubject("quizverse토큰")
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .withClaim("user_id", userId)
                .withClaim("user_email", userEmail)
                .sign(Algorithm.HMAC512(SECRET_KEY)); // HMAC512 알고리즘 사용
    }

    // JWT 검증 메서드
    public boolean validateToken(String token) {
        try {
            JWT.require(Algorithm.HMAC512(SECRET_KEY))
                    .build()
                    .verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // JWT에서 클레임 추출 메서드
    public DecodedJWT getClaims(String token) {
        return JWT.require(Algorithm.HMAC512(SECRET_KEY))
                .build()
                .verify(token);
    }

    // JWT에서 사용자 ID 추출 메서드
    public int getUserId(String token) {
        return getClaims(token).getClaim("user_id").asInt();
    }

    // JWT에서 사용자 이메일 추출 메서드
    public String getUserEmail(String token) {
        return getClaims(token).getClaim("user_email").asString();
    }
}
