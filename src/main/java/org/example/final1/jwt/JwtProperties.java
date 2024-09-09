package org.example.final1.jwt;

public interface JwtProperties {
    String SECRET="quizverse";
    int EXPIRATION_TIME=60000*120;
    String TOKEN_PREFIX="Bearer ";
    String HEADER_STRING="Authorization";
    long REFRESH_EXPIRATION_TIME = 3000000000L;  // 30일 (Refresh Token 유효 기간)
}
