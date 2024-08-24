package org.example.final1.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // JwtProperties에서 상수 가져오기
    private final String SECRET_KEY = JwtProperties.SECRET;
    private final int EXPIRATION_TIME = JwtProperties.EXPIRATION_TIME;
    private final long REFRESH_EXPIRATION_TIME = JwtProperties.REFRESH_EXPIRATION_TIME;

    // JWT 생성 메서드
    public String createToken(int userId, String userEmail) {
        return Jwts.builder()
                .setSubject("quizverse토큰")
                .claim("user_id", userId)
                .claim("user_email", userEmail)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }

    // JWT 생성 메서드 (만료 시간이 다를 경우)
    public String createToken(int userId, String userEmail, long expirationTime) {
        return Jwts.builder()
                .setSubject("quizverse토큰")
                .claim("user_id", userId)
                .claim("user_email", userEmail)
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY.getBytes())
                .compact();
    }

    // JWT 검증 메서드
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // JWT에서 클레임 추출 메서드
    public Claims getClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .parseClaimsJws(token)
                .getBody();
    }

    // JWT에서 사용자 ID 추출 메서드
    public int getUserId(String token) {
        Claims claims = getClaims(token);
        return claims.get("user_id", Integer.class);
    }

    // JWT에서 사용자 이메일 추출 메서드
    public String getUserEmail(String token) {
        Claims claims = getClaims(token);
        return claims.get("user_email", String.class);
    }
}
