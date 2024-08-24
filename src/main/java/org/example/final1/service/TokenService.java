package org.example.final1.service;

import org.example.final1.jwt.JwtProperties;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.TokenDto;
import org.example.final1.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenRepository tokenRepository;

    // Refresh Token으로 Access Token을 갱신하는 메서드
    public String refreshAccessToken(String refreshToken) {
        Optional<TokenDto> tokenDtoOptional = tokenRepository.findByRefreshToken(refreshToken);

        if (tokenDtoOptional.isPresent()) {
            TokenDto tokenDto = tokenDtoOptional.get();
            int userId = tokenDto.getUser().getUser_id();
            String userEmail = tokenDto.getUser().getUser_email();

            // 새로운 Access Token 생성
            String newAccessToken = jwtTokenProvider.createToken(userId, userEmail);

            // 새로운 Refresh Token 생성
            String newRefreshToken = jwtTokenProvider.createToken(userId, userEmail, JwtProperties.REFRESH_EXPIRATION_TIME);

            // 기존 Refresh Token 삭제
            tokenRepository.deleteByRefreshToken(refreshToken);

            // 새로운 Refresh Token 데이터베이스에 저장
            TokenDto newTokenDto = TokenDto.builder()
                    .user(tokenDto.getUser())
                    .refreshToken(newRefreshToken)
                    .expiryDate(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME)
                    .build();
            tokenRepository.save(newTokenDto);

            return newAccessToken;
        }

        throw new RuntimeException("Invalid refresh token");
    }

    // 로그아웃 메서드
    public void logout(String refreshToken) {
        // Refresh Token을 기반으로 TokenDto를 찾고, 삭제
        tokenRepository.deleteByRefreshToken(refreshToken);
    }
}
