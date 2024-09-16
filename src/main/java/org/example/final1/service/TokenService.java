package org.example.final1.service;

import lombok.AllArgsConstructor;
import org.example.final1.jwt.JwtProperties;
import org.example.final1.jwt.JwtTokenProvider;
import org.example.final1.model.TokenDto;
import org.example.final1.model.UserDto;
import org.example.final1.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class TokenService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenRepository tokenRepository;

    public void saveRefreshToken(String refreshToken, UserDto user, String deviceId){
        //기존 동일한 device id에 대한 토큰이 있으면 확인하고 삭제
        TokenDto existingToken=tokenRepository.findByUserAndDeviceId(user,deviceId);
        if(existingToken!=null){
            tokenRepository.delete(existingToken);
        }
        //새로운 tokendto생성
        TokenDto tokenDto = TokenDto.builder()
                .refreshToken(refreshToken)
                .user(user)
                .deviceId(deviceId)
                .expiryDate(System.currentTimeMillis() + JwtProperties.REFRESH_EXPIRATION_TIME)
                .build();

        tokenRepository.save(tokenDto);


    }

    public void deleteRefreshToken(String refreshToken){
        tokenRepository.deleteByRefreshToken(refreshToken);
    }

    public TokenDto getTokenByRefreshToken(String refreshToken) {
        TokenDto tokenDto = tokenRepository.findByRefreshToken(refreshToken);

        if (tokenDto != null) {
            // Token이 존재할 때의 로직 처리
            return tokenDto;
        } else {
            // Token이 존재하지 않을 때의 로직 처리 (예: 오류 반환, 로그아웃 처리 등)
            return null;
        }
    }

    // Refresh Token으로 Access Token을 갱신하는 메서드
    public String refreshAccessToken(String refreshToken) {
        Optional<TokenDto> tokenDtoOptional = Optional.ofNullable(tokenRepository.findByRefreshToken(refreshToken));

        if (tokenDtoOptional.isPresent()) {
            TokenDto tokenDto = tokenDtoOptional.get();
            int userId = tokenDto.getUser().getUserId();
            String userEmail = tokenDto.getUser().getUserEmail();

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
}
