package org.example.final1.jwt;

public interface JwtProperties {
    String SECRET="quizverse";
    int EXPIRATION_TIME=60000*20;
    String TOKEN_PREFIX="Bearer ";
    String HEADER_STRING="Authorization";
}
